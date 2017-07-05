var gulp = require('gulp');
var browserify=require("gulp-browserify");//模块化
var rename = require("gulp-rename");
var watch = require('gulp-watch');
var connect = require('gulp-connect');

gulp.task('connect',function(){
	connect.server({
		port:8010,
		livereload: true
	})
})
.task('html',function(){
	gulp.src('*/*/*html')
	       .pipe(connect.reload());
}).task('js',function(){
	gulp.src('*/*/*js')
	       .pipe(connect.reload());
}).task('css',function(){
	gulp.src('*/*/*css')
	       .pipe(connect.reload());
}).task('watch',function(){
	gulp.watch(['*/*/*html','*.html','*/*.html'],['html']);
	gulp.watch(['*/*/*js','*.js','*/*.js'],['js']);
	gulp.watch(['*/*/*css','*.css','*/*.css'],['css']);
})

.task('bound',function(){
	gulp.src(['controller/*.js','js/*.js'],{
		read: false
	}).pipe(browserify({
		insertGlobals:true,
		debug:!gulp.env.production
	}))
	.pipe(rename('bound.js'))
	.pipe(gulp.dest('bound/'))
})


gulp.task('default',['connect','watch','bound']);