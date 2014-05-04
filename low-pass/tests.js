var vows = require('vows');
var assert = require('assert');

var twitter = require('./data/twitter');

var suite = vows.describe('twitter');

suite.addBatch({
  'getting data' : {
    'connecting': {
      topic : twitter.twitter,
      
      'can read twitterapi.json': function(topic){
        assert.isObject(topic.key);
        assert.isString(topic.key.key);
        assert.isString(topic.key.keySecret);
        assert.isString(topic.key.token);
        assert.isString(topic.key.tokenSecret);
      },

      'can connect to api': function(topic){
        assert.isObject(topic.T);
      },

      'can pull a page of tweets': {
        topic: function () {
                 twitter.twitter.getTweets('twitter', null, 1, this.callback)
               },
        'something is returned' : function (err, tweets) {
          assert.isTrue(tweets.length > 0);
        }
      }
    }
  }

});

suite.run();
