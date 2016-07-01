# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Source.create(name: 'JDG', language: 'fr', display: true, rss_url: 'http://feeds2.feedburner.com/LeJournalduGeek')
Source.create(name: 'Challenges', language: 'fr', display: true, rss_url: 'http://rss.challenges.fr/c/32261/fe.ed/www.challenges.fr/rss.xml')
Source.create(name: 'LeMonde', language: 'fr', display: true, rss_url: 'http://rss.lemonde.fr/c/205/f/3050/index.rss')
Source.create(name: 'Korben', language: 'fr', display: true, rss_url: 'http://feeds2.feedburner.com/KorbensBlog-UpgradeYourMind?format=xml')
Source.create(name: 'BBC', language: 'en', display: false, rss_url: 'http://feeds.bbci.co.uk/news/rss.xml')
Source.create(name: 'LeParisien', language: 'fr', display: true, rss_url: 'http://www.leparisien.fr/une/rss.xml')
Source.create(name: 'LePoint', language: 'fr', display: true, rss_url: 'http://www.lepoint.fr/24h-infos/rss.xml')
