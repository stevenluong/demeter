//var serverPathHTTP = "localhost:8000/http"
var serverPathHTTP = "slapps.fr/demeter/http"
var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var fs = require('fs');
var PDFParser = require('pdf2json');
var pdfParser = new PDFParser();
var path    = require("path");
var COMMON = require("./common.js");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./uploads');
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: storage }).single("pdf")

app.listen(3000,function(){
    console.log("Working on port 3000");
});
app.get('/',function(req,res){
    res.redirect("http://"+serverPathHTTP);
});
app.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'))
});

// UPLOAD
app.post('/sendPDF',function(req,res){
    upload(req,res,function(err) {
        //console.log(req.file)
        if(err) {
            console.log(err);
            return res.end(err);
        }
        if(req.file.mimetype.split('/')[1]!="pdf")
            return res.end("not a PDF");
        pdfParser.loadPDF(req.file.path);
        res.redirect("http://"+serverPathHTTP);
    });
});
// PROCESS PDF
pdfParser.on("pdfParser_dataError", errData => console.log(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    //fs.writeFile("./out.json", JSON.stringify(pdfData));
    //console.log(pdfData);
    var expenses = [];
    var es = [];
    var pages = pdfData.formImage.Pages;
    var bank = extractBank(pages);
    //console.log(bank);
    //TODO create statement
    var data ={
        statement: {
            bank: bank,
            date: new Date(),
            pdf: "link"
        }
    };
    COMMON.ror_post(data,"slapps.fr","/demeter/ror/statements.json",function(result){
        console.log(result);
        var statement = JSON.parse(result);
        console.log(statement.id);
        if(bank == "HSBC"){
            es = extractExpensesHSBC(pages);
        }
        else if(bank=="AMEX"){
            es = extractExpensesAMEX(pages);
        }
        else
            console.log("ERROR BANK");
        es.forEach(function(e){
            expenses.push(e);
        });
        process(statement.id,expenses);

    });

});
var extractBank = function(pages){
    var content = "";
    for(var i in pages){
        pages[i].Texts.forEach(function(t){
            //PROCESSING
            var text =  customParse(t.R[0].T);
            //console.log(text)
            content = content + text;
        });
    }
    //console.log(content);
    var hsbc = (content.match(new RegExp("hsbc", "g")) || []).length
        var amex = (content.match(new RegExp("americanexpress", "g")) || []).length 
        if(hsbc > amex)
            return "HSBC";
        else if(hsbc < amex)
            return "AMEX";
        else
            return "?";
}
var process = function(statementId,expenses){
    var total = 0;
    var income = 0;
    var outcome = 0;
    for(var i in expenses){
        var data ={
            transaction: {
                statement_id: statementId,
                value: expenses[i].value,
                description: expenses[i].description,
                transaction_type: expenses[i].type
                    //TODO DATES
            }

        };
        COMMON.ror_post(data,"slapps.fr","/demeter/ror/transactions.json",function(){});
        //console.log(expenses[i].value);
        if(expenses[i].type =="Income")
            income = income + parseFloat(expenses[i].value);	
        if(expenses[i].type =="Outcome")
            outcome = outcome + parseFloat(expenses[i].value);	
    }
    total = income - outcome;
    console.log("Income = "+income.toFixed(2));
    console.log("Outcome = "+outcome.toFixed(2));
    console.log("Total = "+total.toFixed(2));
}
var customParse = function(s){
    return s.toLowerCase().replace(/%c3%b4/g,"ô").replace(/%c3%aa/g,"ê").replace(/%c2%b0/g,"°").replace(/%c3%a0/g,"à").replace(/%c3%a8/g,"è").replace(/%c3%a9/g,"é").replace(/%c3%a9/g,"è").replace(/%20/g," ").replace(/%2c/g,".").replace(/%2f/g,"/").replace(/%c3%bb/g,"û");
}
//TODO REVIEW MAY BE LACKING INFO
//TODO FIX THOUSANDS SPACE ISSUE
var extractExpensesAMEX = function(pages){
    var lineContent = "";
    //var p = pdfData.formImage.Pages[i];
    var content = {};
    for(var i in pages){
        pages[i].Texts.forEach(function(t){
            //TODO remove?
            if(t.y==8.067)
                console.log(t);
            var newLineNumber = t.y;
            if(typeof content[i+"-"+newLineNumber]=="undefined")
                content[i+'-'+newLineNumber] = "";
            content[i+'-'+newLineNumber] = content[i+'-'+newLineNumber] + customParse(t.R[0].T)+"|";
        });
    }
    //console.log(content);

    //console.log('----------');
    // FILTER EXPENSES
    var expenses = [];
    for(var l in content){
        //There is no content
        if(isNaN(content[l][0]))
            continue;

        var splits = content[l].split('|');
        var length = splits.length;
        //console.log()
        //console.log(content[l]);
        //PROCESS
        //It's not a number
        if(splits[0].split('.').length!=2 || splits[0].split('.')[1].length!=2)
            continue;
        //It s a total (first line on top)
        if(splits[1]=="eur")
            continue;
        //console.log("YES-----");
        //PARSE
        var e = {};
        e["value"] = parseFloat(splits[0].replace(",","."));
        //console.log(e["value"]);
        e["date"] = splits[splits.length-5]+" "+splits[splits.length-4];
        e["description"] = splits[1]+" "+splits[2];
        if(splits[1]=="prelevement")
            e["type"] = "Income";	
        else{
            e["type"] = "Outcome";	
            expenses.push(e);
        }
    }
    return expenses;

}

var extractExpensesHSBC = function(pages){
    var lineContent = "";
    //var p = pdfData.formImage.Pages[i];
    var content = {};
    var tmp =0;
    for(var i in pages){
        pages[i].Texts.forEach(function(t){
            //console.log(t);
            //console.log(t.y+"-"+t.R[0].T);
            var newLineNumber = t.y.toFixed(1);
            if(typeof content[i+'-'+newLineNumber]=="undefined")
                content[i+'-'+newLineNumber] = "";
            if(t.x>25 && t.x<30)
                content[i+'-'+newLineNumber] = content[i+'-'+newLineNumber] +"O"+customParse(t.R[0].T)+"|";
            else if(t.x>30 && t.x<50)
                content[i+'-'+newLineNumber] = content[i+'-'+newLineNumber] +"I"+customParse(t.R[0].T)+"|";
            else
                content[i+'-'+newLineNumber] = content[i+'-'+newLineNumber] +customParse(t.R[0].T).replace(/\s\s+/g, '|')+"|";
        });
    }
    //console.log(content);
    // FILTER EXPENSES
    var expenses = [];
    for(var l in content){
        var splits = content[l].split('|');
        var length = splits.length;
        //La premiere valeur est une date
        if(splits[0].split('.').length!=2)
            continue;
        //console.log(splits);
        //Il faut 4 valeurs
        if(!splits[0]||!splits[1]||!splits[2]||!splits[3]||splits.length>6)
            continue;
        //console.log("--------");
        //PARSE
        var e = {};
        e["date"] = splits[0];
        e["description"] = splits[1];
        //length is variable
        if(splits[length-2][0]=="I")
            e["type"] = "Income";	
        else if(splits[length-2][0]=="O")
            e["type"] = "Outcome";	
        else
            e["type"] = "ERR";	
        var value = splits[length-2].replace("I","").replace("O","")
            if(splits[length-2].split('.').length>2)
                value = value.replace(".","");
        e["value"] = parseFloat(value);
        expenses.push(e);
    }
    return expenses;

}

