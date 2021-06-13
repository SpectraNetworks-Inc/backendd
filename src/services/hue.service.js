const hue = require('node-hue-api');
const LightState = hue.model.LightState;
const NodeCache = require( "node-cache" );
const stateCache = new NodeCache();
const config = require('../config/config');

//Yeet
const getLightstateAndCache = async (lightID, stateKey) => {
    hue.discovery.nupnpSearch().then(searchResults => {
        const host = searchResults[0].ipaddress;
        return hue.api.createLocal(host).connect(config.philipsHue.username);
    }).then(api => {
        return api.lights.getLightState(lightID);
    }).then(state => {
        stateCache.set(stateKey, state, 10000 );
    });
}

/**
 * Changes my bedroom lights red for 5 seconds (Searches for bridge signs in with username gets current light state caches it sets lights to red for 5 seconds reverts back to stored cache)
 * @returns Logged
 */
const tempRedBdrm = async () => {
    hue.discovery.nupnpSearch().then(searchResults => {
        const host = searchResults[0].ipaddress;
        return hue.api.createLocal(host).connect(config.philipsHue.username);
    }).then(api => {
        api.lights.getLightState(1).then(state => {
            if (state.on == true){
                stateCache.set('light1', state, 20);
                setTimeout(function(){
                    const state = new LightState().on().brightness(50).xy(0.75,0.27).transitionFast();
                    api.lights.setLightState(1, state);
                }, 500);
                setTimeout(function(){
                    const state = stateCache.get('light1');
                    api.lights.setLightState(1, state);
                }, 5000);
                setTimeout(function(){
                    stateCache.del('light1');
                }, 6000);
            } else {
                console.log('Light 1 was off skipping function');
            }
        });
        api.lights.getLightState(3).then(state => {
            if (state.on == true){
                stateCache.set('light3', state, 20);
                setTimeout(function(){
                    const state = new LightState().on().brightness(50).xy(0.75,0.27).transitionFast();
                    api.lights.setLightState(3, state);
                }, 500);
                setTimeout(function(){
                    const state = stateCache.get('light3');
                    api.lights.setLightState(3, state);
                }, 5000);
                setTimeout(function(){
                    stateCache.del('light3');
                }, 6000);
            } else {
                console.log('Light 3 was off skipping function');
            }
        });
    }).then(() => {
    console.log(`tempRedBdrm(f) Triggered`);
    });
}

module.exports = {
    getLightstateAndCache,
    tempRedBdrm,
};
