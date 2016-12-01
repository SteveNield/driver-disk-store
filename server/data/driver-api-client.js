var currencyFormatter = require('./../../lib/currency-formatter');

var makes = [{ 
        id: '12345', 
        name: 'Acer'
    }, { 
        id: '23456', 
        name: 'Dell'
    }, { 
        id: '34567', 
        name: 'Lenovo'
    }
];

var models = [{
    id: '987',
    makeId: '12345',
    name: 'Aspire 5560'
},{
    id: '656',
    makeId: '12345',
    name: 'Aspire 5570'
},{
    id: '9898',
    makeId: '12345',
    name: 'Aspire 5580'
},{
    id: '455',
    makeId: '23456',
    name: 'XPS 13'
},{
    id: '122',
    makeId: '23456',
    name: 'XPS 15'
},{
    id: '199',
    makeId: '23456',
    name: 'Inspiron 2200'
},{
    id: '199',
    makeId: '23456',
    name: 'Inspiron 1500'
},{
    id: '988',
    makeId: '34567',
    name: 'YTU 988'
},{
    id: '544',
    makeId: '34567',
    name: 'PPI 277'
}];

var operatingSystems = [{
    id: '987',
    name: 'Windows XP'
},{
    id: '43322',
    name: 'Windows Vista'
},{
    id: '444',
    name: 'Windows 7'
},{
    id: '777',
    name: 'Windows 8'
},{
    id: '665',
    name: 'Windows 10'
}];

var products = [{
    id: '181',
    description: 'Acer Aspire 5570 Driver Disk for Windows XP',
    longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.',
    make: '12345',
    model: '656',
    operatingSystem: '987',
    price: 9.99
}, {
    id: '144',
    description: 'Acer Aspire 5570 Driver Disk for Windows Vista',
    longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.',
    make: '12345',
    model: '656',
    operatingSystem: '43322',
    price: 9.99
}];

var routes = [{
        matches: function(url){
            return url === '/makes';
        }, 
        getData: function(url, query){
            return makes;
        }
    }, {
        matches: function(url){
            return url === '/operatingsystems';
        },
        getData: function(url, query){
            return operatingSystems;
        }
    }, {
        matches: function(url){
            return url.indexOf('/models') !== -1;
        },
        getData: function(url, query){
            return models.filter(function(model){
                return model.makeId === query.makeId;
            });
        }
    }, {
        matches: function(url){
            return url.indexOf('/products') !== -1;
        },
        getData: function(url, query){
            return products.find(function(product){
                if (product.make === query.make &&
                    product.model === query.model &&
                    product.operatingSystem === query.operatingSystem)
                    return true;
                else
                    return false;
            });
        }
    }
];

module.exports.get = function(url, query){
    return new Promise(function(resolve, reject){
        var endpoint = routes.find(function(route){
            return route.matches(url);
        });
        
        if(!endpoint){
            reject({ status: 404 });
        } else {
            resolve(endpoint.getData(url, query));
        }
    });
}