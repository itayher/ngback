﻿/***********************************************
 * backand JavaScript Library
 * Authors: backand
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 * Compiled At: 06/24/2014
 ***********************************************/
var backand = {
    /* initiate app and user security tokens */
    options: {
        url: '',
        version: '1',
        getUrl: function(apiUrl) {
            return this.url + '/' + this.version + apiUrl;
        },
        /* general ajax call for backand rest api */
        ajax: function(url, data, verb, successCallback, erroCallback) {
            alert("ajax")

        },
        verbs: {
            get: "GET",
            put: "PUT",
            post: "POST",
            delete: "DELETE"
        }


    },
    security: {
        banner: {
            url: '/api/banner',
            getAdminInfo: function() {
                var adminInfo = null;
                backand.options.ajax(backand.options.url + backand.security.banner.url, null, backand.options.verbs.post, function(data) {
                    adminInfo = data;
                });
                return adminInfo;
            }

        },
        authentication: {
            url: "/token",
            token: null,
            onlogin: null,
            addLoginEvent: function(appname) {
                if (backand.security.authentication.onlogin != null) return;
                // Create the event
                backand.security.authentication.onlogin = new CustomEvent("onlogin", {
                    "appname": appname
                });
            },
            login: function(username, password, appname, successCallback, errorCallback) {
                alert("login")
                backand.security.authentication.addLoginEvent();
                console.log("*******")
                backand.options.ajax(backand.options.url + backand.security.authentication.url, {
                        grant_type: "password",
                        username: username,
                        password: password,
                        appname: appname
                    }, backand.options.verbs.post, function(data) {
                        console.log(data)
                        console.log("-------")
                        backand.security.authentication.token = data.token_type + " " + data.access_token;
                        alert(backand.security.authentication.token)
                        document.dispatchEvent(backand.security.authentication.onlogin);
                        if (successCallback) successCallback(data);
                    },
                    function(xhr, textStatus, err) {
                        if (errorCallback && xhr) errorCallback(xhr, textStatus, err)
                    },
                    true);
            }
        }
    },

    api: {
        /* app is the object the contains the information of all the genral content of the app */
        app: {
            url: '/app/config',
            /* get the configuration information of the app */
            getConfig: function(successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.app.url);
                backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
            }
        },
        /* view is the object the contains the information about a database table or view */
        view: {
            config: {
                url: '/view/config/',
                /* get the configuration information of the view such as view name, columns names and columns types */
                getItem: function(name, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.config.url + name);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function(withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.config.url);
                    var data = {
                        withSelectOptions: withSelectOptions,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        filter: JSON.stringify(filter),
                        sort: JSON.stringify(sort),
                        search: search
                    };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },

            },
            /* get the view data */
            data: {
                url: '/view/data/',
                /* get a single row by the primary key (id) */
                getItem: function(name, id, deep, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name + '/' + id);
                    var data = {
                        deep: deep
                    };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);
                },
                /* get a list of rows with optional filter, sort and page */
                getList: function(name, withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name);
                    var data = {
                        withSelectOptions: withSelectOptions,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        filter: JSON.stringify(filter),
                        sort: JSON.stringify(sort),
                        search: search
                    };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
                createItem: function(name, data, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name);
                    backand.options.ajax(url, data, backand.options.verbs.post, successCallback, errorCallback);
                },
                updateItem: function(name, id, data, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name + '/' + id);
                    backand.options.ajax(url, data, backand.options.verbs.put, successCallback, errorCallback);
                },
                deleteItem: function(name, id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.view.data.url + name + '/' + id);
                    backand.options.ajax(url, null, backand.options.verbs.delete, successCallback, errorCallback);
                }
            }

        },
        /* dashboard is a collection of charts */
        dashboard: {
            config: {
                url: '/dashboard/config/',
                /* get the configuration information of a specific dashboard */
                getItem: function(id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.dashboard.config.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function(withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.dashboard.config.url);
                    var data = {
                        withSelectOptions: withSelectOptions,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        filter: JSON.stringify(filter),
                        sort: JSON.stringify(sort),
                        search: search
                    };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
            },
            /* get the data of all the charts in this dashboard */
            data: {
                url: '/dashboard/data/',
                getItem: function(id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.dashboard.data.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
            }

        },
        chart: {
            config: {
                url: '/chart/config/',
                /* get the configuration information of a specific chart */
                getItem: function(id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.chart.config.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
                getList: function(withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.chart.config.url);
                    var data = {
                        withSelectOptions: withSelectOptions,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        filter: JSON.stringify(filter),
                        sort: JSON.stringify(sort),
                        search: search
                    };
                    backand.options.ajax(url, data, backand.options.verbs.get, successCallback, errorCallback);

                },
            },
            data: {
                url: '/chart/data/',
                /* get the data of a specific chart */
                getItem: function(id, successCallback, errorCallback) {
                    var url = backand.options.getUrl(backand.api.chart.data.url + id);
                    backand.options.ajax(url, null, backand.options.verbs.get, successCallback, errorCallback);
                },
            }

        },

    },
    filter: {
        item: function(fieldName, operator, value) {
            this.fieldName = fieldName;
            this.operator = operator;
            this.value = value;
        },
        operator: {
            numeric: {
                equals: "equals",
                notEquals: "notEquals",
                greaterThan: "greaterThan",
                greaterThanOrEqualsTo: "greaterThanOrEqualsTo",
                lessThan: "lessThan",
                lessThanOrEqualsTo: "lessThanOrEqualsTo",
                empty: "empty",
                notEmpty: "notEmpty"
            },
            date: {
                equals: "equals",
                notEquals: "notEquals",
                greaterThan: "greaterThan",
                greaterThanOrEqualsTo: "greaterThanOrEqualsTo",
                lessThan: "lessThan",
                lessThanOrEqualsTo: "lessThanOrEqualsTo",
                empty: "empty",
                notEmpty: "notEmpty"
            },
            text: {
                equals: "equals",
                notEquals: "notEquals",
                startsWith: "startsWith",
                endsWith: "endsWith",
                contains: "contains",
                notContains: "notContains",
                empty: "empty",
                notEmpty: "notEmpty"
            },
            boolean: {
                equals: "equals"
            },
            relation: { in : "in"
            },
        },
    },
    sort: {
        item: function(fieldName, order) {
            this.fieldName = fieldName;
            this.order = order;
        },
        order: {
            asc: "asc",
            desc: "desc"
        }

    }

};


backand.filter.item.prototype.constructor = backand.filter.item;

backand.filter.item.prototype.fieldName = function() {
    return this.fieldName;
};

backand.filter.item.prototype.operator = function() {
    return this.operator;
};

backand.filter.item.prototype.value = function() {
    return this.value;
};


backand.sort.item.prototype.constructor = backand.sort.item;

backand.sort.item.prototype.fieldName = function() {
    return this.fieldName;
};

backand.sort.item.prototype.order = function() {
    return this.order;
};
