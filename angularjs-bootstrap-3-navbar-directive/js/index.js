angular.module('navbarTest',['ngSanitize'])

.controller('navbarDirectiveTestCtrl',function($scope){
  //=== Variables ===//
  $scope.menus = [
    {
      title : "Dropdown Menu",
      menu : [
        {
          title : "Menu Item One",
          action : "item.one"
        },
        {
          title : "Menu Item Two",
          action : "item.two"
        },
        {
          divider: true
        },
        {
          title : "Menu Item Three",
          action : "item.three"
        }
      ]
    },
    {
      title : "Singular Menu Item",
      action : "singular"
    }
  ]; // end menus
  

}) // end navbarDirectiveTestCtrl

/**
 * Angled Navbar Directive
 *
 * @requires: ngSanitize, Bootstrap 3 (jQuery & Bootstrap's JS - responseive features require the inclusion of the Bootstrap JS)
 **/
.directive('angledNavbar',function(){
  return {
    restrict : 'AE',

    templateUrl : 'tmpls/nav/navbar.html',
    controller : function($scope){
      /**
       * Has Menus
       * Checks to see if there were menus passed in for the navbar.
       * @result  boolean
       */
      $scope.hasMenus = function(){
        return (angular.isDefined($scope.menus));
      };
      
      /**
       * Has Dropdown Menu
       * Check to see if navbar item should have a dropdown menu
       * @param  object  menu
       * @result  boolean
       */
      $scope.hasDropdownMenu = function(menu){
        return (angular.isDefined(menu.menu) && angular.isArray(menu.menu));
      }; // end hasDropdownMenu
      
    }
  };
}) // end navbar

.run(function($templateCache){
  $templateCache.put('tmpls/nav/navbar.html','<nav class="navbar"  role="navigation"><div class="container-fluid"><div class="collapse navbar-collapse" id="navbar-menu"><ul class="nav navbar-nav" ng-if="hasMenus()"><li ng-repeat="menu in menus" ng-class="{true: \'dropdown\'}[hasDropdownMenu(menu)]"><a ng-if="!hasDropdownMenu(menu)" ng-click="navAction(menu.action)">{{menu.title}}</a><a ng-if="hasDropdownMenu(menu)" class="dropdown-toggle" data-toggle="dropdown">{{menu.title}} <b class="caret"></b></a><ul ng-if="hasDropdownMenu(menu)" class="dropdown-menu"><li ng-repeat="item in menu.menu" ng-class="{true: \'divider\'}[isDivider(item)]"><a ng-if="!isDivider(item)" ng-click="navAction(item.action)">{{item.title}}</a></li></ul></li></ul></div></div></nav>');
});