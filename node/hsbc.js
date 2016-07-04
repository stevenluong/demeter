let fs = require('fs'),
	PDFParser = require("./node_modules/pdf2json/PDFParser");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
	//fs.writeFile("./out.json", JSON.stringify(pdfData));
	//console.log(pdfData);
	var pages = pdfData.formImage.Pages;
	var expenses = [];
	for(var i in pages){
		var es = extractExpenses(pages[i]);
		es.forEach(function(e){
			expenses.push(e);
		});
	}
	process(expenses);
});
var process = function(expenses){
	var total = 0;
	var income = 0;
	var outcome = 0;
	for(var i in expenses){
		console.log(expenses[i].value);
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
var extractExpenses = function(p){
	var lineContent = "";
	var lineNumber = 0;
	//var p = pdfData.formImage.Pages[i];
	var content = {};
	var tmp =0;
	p.Texts.forEach(function(t){
		//console.log(t);
		//console.log(t.y+"-"+t.R[0].T);
		var newLineNumber = t.y;
		if(typeof content[newLineNumber]=="undefined")
			content[newLineNumber] = "";
		if(t.x>25 && t.x<30)
			content[newLineNumber] = content[newLineNumber] +"O"+t.R[0].T.replace("%2C",",")+" ";
		else if(t.x>30 && t.x<50)
			content[newLineNumber] = content[newLineNumber] +"I"+t.R[0].T.replace("%2C",",")+" ";
		else
			content[newLineNumber] = content[newLineNumber] +t.R[0].T.replace("%2C",",")+" ";
	});
	// FILTER EXPENSES
	var expenses = [];
	for(var l in content){
		if(!isNaN(content[l][0]) && !isNaN(content[l][1])&&isNaN(content[l][2]) &&!isNaN(content[l][3])&& !isNaN(content[l][4])){
		//console.log(content[l]);
			/*
			   var tmp = content[l].split(",");
			   var value = tmp[0].replace(" ","");
			   tmp.shift();
			   tmp.unshift(value);
			   content[l] = tmp.join(",");
			   */
			var splits = content[l].split(' ');
			var length = splits.length;
			//console.log(content[l]);
			//console.log(length);
			//PARSE
			var e = {};
			e["date"] = splits[0];
			e["description"] = splits[2];
			if(splits[length-2][0]=="I")
				e["type"] = "Income";	
			else if(splits[length-2][0]=="O")
				e["type"] = "Outcome";	
			else
				e["type"] = "ERR";	
			e["value"] = parseFloat(splits[length-2].replace("I","").replace("O","").replace(".","").replace(",","."));
			//console.log(e["value"]);
			//console.log(e);
			expenses.push(e);
			//else{
			//console.log("NP"+content[l]);
			//}
		}
	}
	return expenses;

}
pdfParser.loadPDF("./HSBC Jun 2016.pdf");

