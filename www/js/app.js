(function(){

	var app = angular.module('starter', ['ionic']);
	var classObj={};
	
	app.service('sp', function () {
        var property = 'First';
		var paper;
		console.log('inside service');
        return {
            getProperty: function () {
                return paper;
            },
            setProperty: function(pcode) {
				paper=pcode;
				console.log(paper);
            }
        };
    });
	
	app.config(function($stateProvider, $urlRouterProvider){
		console.log('1');
		/*$stateProvider.state('add', {
			url: '/add',
			templateUrl: 'templates/add.html',
			controller: 'AddCtrl'
			
		});*/
		console.log('2');
		$stateProvider.state('list', {
			url: '/list',
			
			templateUrl: 'templates/login.html',
			cache: false,
			controller: 'AppCtrl1'
		});
		console.log('3');
		$stateProvider.state('stream', {
			url: '/stream',
			templateUrl: 'templates/pg2.html',
			controller: 'EditCtrl'
		});
		console.log('4');
		$stateProvider.state('cprog', {
			url: '/cprog',
			templateUrl: 'templates/pg4.html',
			cache: false,
			resolve:{
				simpleObj:function(){
					return{subject:'c',stream:'MCA',sem:1};
				}
			},
			controller: 'pgfour'
		});
		
		$stateProvider.state('mca',{
			url:'/mca',
			templateUrl:'templates/pg3.html',
			controller:'pgthree'
		});
		
		$stateProvider.state('percentage',{
			url:'/percentage',
			templateUrl:'templates/percentage.html',
			controller:'percentage'
		});

		$urlRouterProvider.otherwise('/list');
	});
	
	
	app.controller('AppCtrl', function($scope, $ionicPopup, $http,$state,$stateParams){
			console.log('jhfjfjfjfgjfkfk');
			$scope.logindata={};
			console.log('jhfjfjfjfgjfkfk');
			$scope.login=function(user){
				console.log('jhfjfjfjfgjfkfk');
				if(typeof(user)=='undefined'){
					console.log('jhfjfjfjfgjfkfk');
					$scope.ShowAlert('Please Fill username');
					return  false;
				}
				console.log('jhfjfjfjfgjfkfk');
				if(user.username=='demo' && user.password=='demo') {
					console.log('jhfjfjfjfgjfkfk');
					$state.go('stream');
				}else {
					console.log('jhfjfjfjfgjfkfk');
					$scope.ShowAlert('Invalid Username & Password');
				}
			}	
				
	});
	
	app.controller('AppCtrl1', function($scope, $ionicPopup, $http,$state,$stateParams){
			$scope.logindata={};
			$scope.login=function(user){
				console.log(user);
				console.log(user);
				$http.post('/bppimt',user).then(function(response){
					console.log(response);
					console.log(response.data.length);
					if(response.data.length>0)
					{
					$scope.user="";
					$state.go('stream');
					}else{
						var alertPopup=$ionicPopup.alert({
							title:'wrong Input',
							template:'Re-input OK'
						});
						alertPopup.then(function(res){
							console.log('Proper Input ');
						})
					}
				});
			}	
				
	});

	




	app.controller('EditCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('INNNNNNNNNNNN');
		$scope.mcatap=function(){
			console.log('Innnnnnn');
			$state.go('mca');
		}
		
		$scope.percentage=function(){
			console.log("maanuuu");
			$state.go('percentage');
		};
			
	});
	
	app.controller('pgthree', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('programming with c');
		$scope.progc=function(){
			console.log('in ccccc');
			$state.go('cprog');
		};
		
		
	});
	
	
	//var i=0;
	var p=0;
	var classObj;
	var tc={};//variable to calculate total class.
	app.controller('pgfour', function($scope,$filter,simpleObj,$ionicActionSheet,$stateParams, $http, $state,$ionicPopup){
		
		
		
		var attdata;
		var i=0;
		console.log(i);
		console.log('inside c attendance');
		console.log(simpleObj.subject);
		console.log(simpleObj.stream);
		console.log(simpleObj.sem);
		console.log(simpleObj);
		$scope.simple=simpleObj.subject;
		console.log($scope.simple);
		$scope.currentdate=new Date();
		console.log($scope.currentdate);
		var date=$filter('date')(new Date(),'dd/MM/yyyy');
		console.log(date);
		$scope.classcode=simpleObj.subject;
		
		tc.stream=simpleObj.stream;
		tc.subject=simpleObj.subject;
		classObj=simpleObj;
		console.log(classObj);

		
		//Total class count..
		$http.post('/clscount/',tc).then(function(response){
					console.log(response);
					console.log(response.data.length);
					$scope.ttlcls=response.data.length;
		});
		
	
	
		
		$scope.atdata=function(data){
			var attdata={};
			console.log(attdata);
			data.isdisabled=false;
			console.log(data.isdisabled);
			console.log(data.Roll);
			data.isdisabled=true;
			data.isdisabledred=false;
			var date=$filter('date')(new Date(),'dd/MM/yyyy');
			console.log(date);
			attdata.date=date;
			console.log(attdata.date);
			attdata.roll=data.Roll;
			console.log(attdata.roll);
			var at='student';
			console.log(at);
			attdata.stream=simpleObj.stream;
			attdata.subject=simpleObj.subject;
			//attdata.date=new date();
			attdata.attend='yes';
			console.log(attdata);
			//take attendance and add record in db...
			console.log(p);
			for(var k=0;k<p;k++){
				console.log(k);
				
				$http.post('/bppimt/'+at,attdata).success(function(data){			
				});
			}
								//increment the total...
								
									$http.post('/bppimt_S',simpleObj).success(function(data){
									//$scope.std=data;
									//console.log(data);
									//console.log(data[1]);
									var total=new Array();
									for(i=0;i<data.length;i++)
									{					
										$http.post('/bppimttotal/',data[i]).success(function(data1){					
											console.log(data1);
											console.log(data1.length);
											total.push(data1.length);
											console.log(total);				
										})
									}
									//console.log(ttl);
									$scope.ttl=total;
									console.log($scope.ttl);			
								});
		};
		
		$scope.remove=function(data){
			var attdata={};
			console.log(attdata);
			data.isdisabled=false;
			console.log(data.isdisabled);
			console.log(data.Roll);
			//data.isdisabled=true;
			data.isdisabledred=true;
			var date=$filter('date')(new Date(),'dd/MM/yyyy');
			console.log(date);
			attdata.date=date;
			console.log(attdata.date);
			attdata.roll=data.Roll;
			console.log(attdata.roll);
			var at='student';
			console.log(at);
			attdata.stream=simpleObj.stream;
			attdata.subject=simpleObj.subject;
			//attdata.date=new date();
			attdata.attend='yes';
			console.log(attdata);
			for(var k=0;k<i;k++){
				$http.post('/removeatt/',attdata).then(function(response){	
					console.log('removeattt');
					console.log(response);
				});
			}
					//increment the total...
								
									$http.post('/bppimt_S',simpleObj).success(function(data){
									//$scope.std=data;
									//console.log(data);
									//console.log(data[1]);
									var total=new Array();
									for(i=0;i<data.length;i++)
									{					
										$http.post('/bppimttotal/',data[i]).success(function(data1){					
											console.log(data1);
											console.log(data1.length);
											total.push(data1.length);
											console.log(total);				
										})
									}
									//console.log(ttl);
									$scope.ttl=total;
									console.log($scope.ttl);			
								});
			
		};
		
	/*
		$scope.addclass=function(){
			var classdata={};
			var date=$filter('date')(new Date(),'dd/MM/yyyy');
			console.log(date);
			classdata.date=date;
			classdata.stream=simpleObj.stream;
			classdata.subject=simpleObj.subject;
			console.log(classdata);
			$http.post('/classdata/',classdata).success(function(data){
						console.log(data);
			});
			
			//Total class count..
			$http.post('/clscount/',tc).then(function(response){
						console.log(response);
						console.log(response.data.length);
						$scope.ttlcls=response.data.length;
			});
			
			
			//Populate the list...		
			$http.post('/bppimt_S',simpleObj).success(function(data){
				$scope.std=data;
				console.log(data);
				//console.log(data[1]);
				var total=new Array();
				for(i=0;i<data.length;i++)
				{					
					$http.post('/bppimttotal/',data[i]).success(function(data1){					
						console.log(data1);
						console.log(data1.length);
						total.push(data1.length);
						console.log(total);				
					})
				}
				//console.log(ttl);
				$scope.ttl=total;
				console.log($scope.ttl);			
		    });
			
			
		};
		
		*/
		
			 // A confirm dialog for class 1
			 $scope.addclass1 = function() {
			   var confirmPopup = $ionicPopup.confirm({
				 title: 'Attendance',
				 template: 'For 1 period!'
			   });

			   confirmPopup.then(function(res) {
				 if(res) {
							console.log('You are sure');
							i=1;
							p=1;
							console.log(i);
							var classdata={};
							var date=$filter('date')(new Date(),'dd/MM/yyyy');
							console.log(date);
							classdata.date=date;
							classdata.stream=simpleObj.stream;
							classdata.subject=simpleObj.subject;
							console.log(classdata);
							$http.post('/classdata/',classdata).success(function(data){
										console.log(data);
							});
							
							//Total class count..
							$http.post('/clscount/',tc).then(function(response){
										console.log(response);
										console.log(response.data.length);
										$scope.ttlcls=response.data.length;
							});
							
							
							//Populate the list...		
							$http.post('/bppimt_S',simpleObj).success(function(data){
								$scope.std=data;
								console.log(data);
								//console.log(data[1]);
								var total=new Array();
								for(i=0;i<data.length;i++)
								{					
									$http.post('/bppimttotal/',data[i]).success(function(data1){					
										console.log(data1);
										console.log(data1.length);
										total.push(data1.length);
										console.log(total);				
									})
								}
								//console.log(ttl);
								$scope.ttl=total;
								console.log($scope.ttl);			
							});
			
				   
				 } else {
				   console.log('You are not sure');
				 }
			   });
			   console.log(confirmPopup);
			 };
			 
			 // A confirm dialog for class 2
			 $scope.addclass2 = function() {
			   var confirmPopup = $ionicPopup.confirm({
				 title: 'Attendance',
				 template: 'For 2 periods!'
			   });

			   confirmPopup.then(function(res) {
				 if(res) {
							console.log('You are sure');
							i=2;
							p=2;
							console.log(i);
							var classdata={};
							var date=$filter('date')(new Date(),'dd/MM/yyyy');
							console.log(date);
							classdata.date=date;
							classdata.stream=simpleObj.stream;
							classdata.subject=simpleObj.subject;
							console.log(classdata);
							//Add two Period,Hence we request two request.
							$http.post('/classdata/',classdata).success(function(data){
										console.log(data);
							});
							$http.post('/classdata/',classdata).success(function(data){
										console.log(data);
							});
							
							//Total class count..
							$http.post('/clscount/',tc).then(function(response){
										console.log(response);
										console.log(response.data.length);
										$scope.ttlcls=response.data.length;
							});
							
							
							//Populate the list...		
							$http.post('/bppimt_S',simpleObj).success(function(data){
								$scope.std=data;
								console.log(data);
								//console.log(data[1]);
								var total=new Array();
								for(i=0;i<data.length;i++)
								{					
									$http.post('/bppimttotal/',data[i]).success(function(data1){					
										console.log(data1);
										console.log(data1.length);
										total.push(data1.length);
										console.log(total);				
									})
								}
								//console.log(ttl);
								$scope.ttl=total;
								console.log($scope.ttl);			
							});
			
				   
				 } else {
				   console.log('You are not sure');
				 }
			   });
			   console.log(confirmPopup);
			 };
			 
			  // A confirm dialog for class 3
			 $scope.addclass3 = function() {
			   var confirmPopup = $ionicPopup.confirm({
				 title: 'Attendance',
				 template: 'For 3 periods!'
			   });

			   confirmPopup.then(function(res) {
				 if(res) {
							console.log('You are sure');
							i=3;
							p=3;
							console.log(i);
							var classdata={};
							var date=$filter('date')(new Date(),'dd/MM/yyyy');
							console.log(date);
							classdata.date=date;
							classdata.stream=simpleObj.stream;
							classdata.subject=simpleObj.subject;
							console.log(classdata);
							//Add 3 period hence we add 3 http request.
							$http.post('/classdata/',classdata).success(function(data){
										console.log(data);
							});
							$http.post('/classdata/',classdata).success(function(data){
										console.log(data);
							});
							$http.post('/classdata/',classdata).success(function(data){
										console.log(data);
							});
							
							//Total class count..
							$http.post('/clscount/',tc).then(function(response){
										console.log(response);
										console.log(response.data.length);
										$scope.ttlcls=response.data.length;
							});
							
							
							//Populate the list...		
							$http.post('/bppimt_S',simpleObj).success(function(data){
								$scope.std=data;
								console.log(data);
								//console.log(data[1]);
								var total=new Array();
								for(i=0;i<data.length;i++)
								{					
									$http.post('/bppimttotal/',data[i]).success(function(data1){					
										console.log(data1);
										console.log(data1.length);
										total.push(data1.length);
										console.log(total);				
									})
								}
								//console.log(ttl);
								$scope.ttl=total;
								console.log($scope.ttl);			
							});
			
				   
				 } else {
				   console.log('You are not sure');
				 }
			   });
			   console.log(confirmPopup);
			 };
			
		$scope.percentage=function(){
			console.log("maanuuu");
			$state.go('percentage');
			$window.location.reload();
			
		};
		
		$scope.home=function(){
			$state.go('stream');
		}
		$scope.logout=function(){
			$state.go('list');
			$window.location.reload();
		}
	});
	
	console.log(classObj);
	
	app.controller('percentage', function($scope,$filter,$ionicActionSheet,$stateParams,$window, $http, $state,$ionicPopup){
			var pertotal={};
			var arrttl=new Array();
			
			console.log(classObj);
			$scope.classcode=classObj.subject;	
			//Total class count..
							$http.post('/clscount/',tc).then(function(response){
										console.log(response);
										console.log(response.data.length);
										pertotal.ttlcls=response.data.length;
										$scope.ttlcls=response.data.length;
										
										
							});
			
				$http.post('/bppimt_S',classObj).success(function(data){
								$scope.std=data;
								console.log(data);
								//console.log(data[1]);
								var total=new Array();
								for(i=0;i<data.length;i++)
								{					
									$http.post('/bppimttotal/',data[i]).success(function(data1){					
										console.log(data1);
										console.log(data1.length);
										total.push(data1.length);
										var a=data1.length;//total class of a student.
										var res=a/pertotal.ttlcls;
										console.log(res);
										res=$window.Math.round(res*100);
										arrttl.push(res);
										console.log(arrttl);	
										console.log(total);				
									})
								}
								//console.log(ttl);
								$scope.ttl=total;
								$scope.perttl=arrttl;
								console.log($scope.ttl);			
							});
							
							$scope.Atten=function(){
								console.log("maanuuu");
								$state.go('cprog');
								$window.location.reload();
								
							};
							
							$scope.home=function(){
								$state.go('stream');
							}
							$scope.logout=function(){
								$state.go('list');
								$window.location.reload();
							}
	});
	
	
	
	app.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the
				keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
}());
