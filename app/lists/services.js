app.factory("listService", ["$localStorage", "$rootScope",function($localStorage, $rootScope){

    var listsData = [];
    var list;
    if($localStorage.lists){
        list = $localStorage.lists
    }
    else {
        list = $localStorage.lists = {};
    }
    
    return {

        lists: function() {
            listsData = [];
            for(var li in list) {
                listsData.push(li);
            }
            return listsData;
        },

        add: function(name) {
            listsData = [];
            $localStorage.lists[name] = [];
            for(var li in list) {
                listsData.push(li);
            }
        },

        remove: function(name) {
            listsData = [];
            delete $localStorage.lists[name];
            listsData = [];
            for(var li in list) {
                listsData.push(li);
            }
            $rootScope.$broadcast("valuesUpdated");
            console.log(listsData);
        },

        edit: function(initName, newName) {
            listsData = [];
            Object.defineProperty($localStorage.lists, newName,
                Object.getOwnPropertyDescriptor($localStorage.lists, initName));

            delete $localStorage.lists[initName];

            for(var li in $localStorage.lists) {
                listsData.push(li);
                console.log("ope");
            }
            
            $rootScope.$broadcast("valuesUpdated");
        }
    }
}]);