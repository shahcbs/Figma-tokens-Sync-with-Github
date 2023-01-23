const StyleDictionaryPackage = require('style-dictionary');
const tinycolor = require('tinycolor2')

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
    name: 'css/variables',
    formatter: function (dictionary, config) {
        return `${this.selector} {\n${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}\n}`
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: function (prop) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSizes", "spacing", "borderRadius", "borderWidth", "sizing", "letterSpacing"].includes(prop.attributes.category);
    },
    transformer: function (prop) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'px';
    }
});

//Transforms boxShadow object to shadow css

function transformShadow(shadow) {
    const { x, y, blur, spread, color } = shadow;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

StyleDictionaryPackage.registerTransform({
    name: 'shadow/css',
    type: 'value',
    transitive: true,
    matcher: token => ['boxShadow'].includes(token.type),
    transformer: token => {
        return Array.isArray(token.original.value) ? token.original.value.map(single => transformShadow(single)).join(', ') : transformShadow(token.original.value);
    },
});

function getStyleDictionaryConfig(theme) {
    return {
        "source": [
            "tokens/01_base/*.json",
            `tokens/02_themes/${theme}.json`,
        ],

        "platforms": {
            "web": {
                "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px", "shadow/css"],
                "buildPath": `dist/`,
                "files": [{

                    "destination": `${theme}.css`,
                    "format": "css/variables",
                    "selector": ':root'
                }]
            }
        }
    };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['dark', 'light'].map(function (theme) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

    StyleDictionary.buildPlatform('web');

    console.log('\nEnd processing');
})

console.log('\n==============================================');
console.log('\nBuild completed!');
