const hue = require('node-hue-api');
const LightState = hue.model.LightState;
const NodeCache = require( "node-cache" );
const stateCache = new NodeCache();
const config = require('../config/config');
const Logger = require('../config/logger');

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
                stateCache.set('light1', state, 50);
                api.lights.setLightState(1, new LightState().on().brightness(50).xy(0.75,0.27).transitionFast());
                Logger.debug('Set Light1 state to Red');
                setTimeout(function(){
                    api.lights.setLightState(1, stateCache.get('light1'));
                    Logger.debug('Reverted back to cached light state for Light1');
                }, 5000);
                setTimeout(function(){
                    stateCache.del('light1');
                    Logger.debug('Cached State for Light1 deleted');
                }, 10000);
            } else {
                Logger.debug('Light1 was off skipping function');
            }
        });
        api.lights.getLightState(3).then(state => {
            if (state.on == true){
                stateCache.set('light3', state, 50);
                api.lights.setLightState(3, new LightState().on().brightness(50).xy(0.75,0.27).transitionFast());
                Logger.debug('Set Light3 state to Red');
                setTimeout(function(){
                    api.lights.setLightState(3, stateCache.get('light3'));
                    Logger.debug('Reverted back to cached light state for Light3');
                }, 5000);
                setTimeout(function(){
                    stateCache.del('light3');
                    Logger.debug('Cached State for Light3 deleted');
                }, 10000);
            } else {
                Logger.debug('Light3 was off skipping function');
            }
        });
    }).then(() => {
        Logger.debug(`tempRedBdrm(f) Triggered`);
    });
}



module.exports = {
    getLightstateAndCache,
    tempRedBdrm,
};
