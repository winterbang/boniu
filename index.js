var superagent = require('superagent');
var cheerio = require('cheerio');
var Wilddog = require('wilddog');

var url = 'http://www.waimai.ph';
var ref = new Wilddog("https://waimaiph.wilddogio.com/stores");

superagent
  .get(url)
  .end(function(err, res){
    if (err) {
      console.log('request error')
      return
    }
    var $ = cheerio.load(res.text);
    // var items = [];
    ref.orderByChild('view').limitToFirst(1).on('child_added', function(stores){
      console.log(`get ${stores.val().id}`)
      superagent
        .get(`${url}/index/store?sid=${stores.val().id}`)
        .end(function(err, res){
          let $ = cheerio.load(res.text);
          $('.goodsLis .storeList').each(function(idx, e){
              // // let $ = require('cheerio')
              // let $e = cheerio.load(e)
              // // console.log(e)
              // // console.log($e.text())
              // let priceNode = $(this).children('.fl')
              // let foodNameNode = priceNode.prev()
              //
              // let price = priceNode.text()
              // let foodName = foodNameNode.text()
              // console.log(`${foodName} --- ${foodName}`)

              let listType = $(this).children('.storeListTyp').text()
          })
        })
    })
    // $('.foodsList a').each(function (idx, e){
    //   var $e = cheerio.load(e);
    //   // console.log(e)
    //   // items.push({
    //   //   link: $e.attr('href'),
    //   //   img: $e('img').attr('src')
    //   // })
    // })
    // console.log(items)
  })
