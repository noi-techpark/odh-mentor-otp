// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

module.exports = {
    presets:[[
        "@babel/preset-env", {
            "useBuiltIns": "entry",
            "corejs": 2
        }],
        "@babel/preset-react"
    ],
    plugins: [        
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-template-literals",   
        "@babel/plugin-proposal-export-default-from", 
        '@babel/plugin-transform-runtime',
        "react-hot-loader/babel"
    ]
}