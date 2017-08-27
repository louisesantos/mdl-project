var MDL_PROJ = MDL_PROJ || {};

MDL_PROJ.main = {
    init: function() {
        var self = this;

        $(function() {
            this.test();    
        });
    },

    test: function() {
        console.log('Olá, tudo bem?');
    }
};

MDL_PROJ.main.init();