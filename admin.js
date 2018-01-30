// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('myadmin_login');
}])

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('My First Admin')
      .baseApiUrl('http://jsonplaceholder.typicode.com/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var user = nga.entity('users');
    var app = nga.application().baseApiUrl('index.html#/dashboard')

    // custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('myadmin_login');
}])

user.listView().fields([
    // use the name as the link to the detail view - the edition view
    nga.field('name').isDetailLink(true),
    nga.field('username'),
    nga.field('email')
]);
user.creationView().fields([
    nga.field('name'),
    nga.field('username'),
    nga.field('email', 'email'),
    nga.field('address.street').label('Street'),
    nga.field('address.city').label('City'),
    nga.field('address.zipcode').label('Zipcode'),
    nga.field('phone'),
    nga.field('website')
]);
// use the same fields for the editionView as for the creationView
user.editionView().fields(user.creationView().fields());
admin.addEntity(user);


var post = nga.entity('posts');
post.listView().fields([
    nga.field('id'),
    nga.field('title'),
    nga.field('userId')
]);
admin.addEntity(post);


admin.dashboard(nga.dashboard()

    .addCollection(nga.collection(user)
        .title('Users')
        .perPage(10)
        .fields([
            nga.field('name'),
        ])
        .listActions(['show'])
        .order(4)
    )
);

var customHeaderTemplate =
'<div class="navbar-header">'+
'<mobile-navigation></mobile-navigation>'+
'<a class="navbar-brand" href="#" ng-click="appController.displayHome()">Admin Backend</a>'+
'</div>'+
'<ul class="nav navbar-top-links navbar-right hidden-xs">'+
//'<li>'+
//'    <a href="https://github.com/marmelab/ng-admin-demo">'+
//'       <i class="fa fa-github fa-lg"></i>&nbsp;Source'+
//'    </a>'+
//'</li>'+
'<li uib-dropdown>'+
'    <a uib-dropdown-toggle href="#" aria-expanded="true" ng-controller="username">'+
'        <i class="fa fa-user fa-lg"></i>&nbsp;{{ username }}&nbsp;<i class="fa fa-caret-down"></i>'+
'    </a>'+
'    <ul class="dropdown-menu dropdown-user" role="menu">'+
'        <li><a href="#" onclick="logout();"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>'+
'    </ul>'+
'</li>'+
'</ul>';
    admin.header(customHeaderTemplate);
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);