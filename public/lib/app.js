var Post = Backbone.Model.extend({
	url : '/posts'
});

var Posts = Backbone.Collection.extend({
	model : Post,
	url : '/posts'
});

var PostsView = Backbone.View.extend({
	el : '#app',
	initialize : function(){
		var self = this;

		if(!this.collection){

			this.collection = new Posts();

			this.collection.fetch({
				success : function(col, err) { self.render(); }
			});
		}

		this.collection.on('add', function() {
			self.render();
		});
	},
	render : function() { 
		var self = this;

		_(this.collection.models).each(function(post) {
            var postView = new PostView({ model: post });
            postView.render();
            self.$el.append(postView.$el.html());
        });

	}
});


var PostView = Backbone.View.extend({
	render : function(){
        var source = $('#posttemplate').html();
        var template = Handlebars.compile(source);
        var html = template(this.model.attributes);
        $(this.el).html(html);
	}
});



var router = Backbone.Router.extend({
	routes : {
		"" : "index"
	},

	index : function() {
		debugger;
		var postList = new Posts();
		postList.fetch({
			success : function(collection, response) { postList.render(); },
			failure : function(collection, response) { alert('someting went wrong'); }
		});
		postList.render();
	}
});


var PostViewNew = Backbone.View.extend({
	el : "#new",
	render : function(){
        var source = $('#posttemplateedit').html();
        $(this.el).html(source);
	},
	events : {
		'click #OK' : "save"
	},
	save : function (){
		var post = new Post({
			title : $('#title').val(),
			date : $('#date').val(),
			author : $('#author').val()
		});
		post.save({
			success: function(model, response){
				alert("post saved successfully");
			},
			error: function(model, response){ 
				alert('could not save post'); 
			}
		});
	}
});