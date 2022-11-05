const CracoLessPlugin = require('craco-less');

module.exports ={
    babel:{  
        plugins: [
          [   
            "import", 
            {
              "libraryName": "antd",
              "libraryDirectory": "es",
               "style": true
            }
         ]
        ]
    },
    // Customize themes
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#33561C',
                        '@border-radius-base':'10px',
                        // '@text-color':'#fff',
                        
                        //Menu
                        '@menu-item-color':'#fff',
                        '@menu-highlight-color':'#fff',
                        '@menu-item-active-bg': '#33561C',

                        // table
                        '@table-header-bg':'#33561C',
                        '@table-header-color':'#fff',
                        '@table-row-hover-bg':'#e4f6d4',

                        //Card
                        '@card-head-background':'transparent',
                        '@card-head-color':'#fff',
                        '@card-background':'transparent',

                        //form
                        '@label-color':'#43aa00'


                    },
                    javascriptEnabled: true,
                },
            },
        },
    },],
    
}
