const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const NodeCache = require( "node-cache" );
const stateCache = new NodeCache();

const getLightstateAndCache = async (lightID, stateKey) => {
    v3.discovery.nupnpSearch().then(searchResults => {

        const host = searchResults[0].ipaddress;
        return v3.api.createLocal(host).connect('94zMO3H90hp1h2PknadE4U-ossCSC8MWDj-6Spht');
    }).then(api => {

        return api.lights.getLightState(lightID);
    }).then(state => {

        stateCache.set(stateKey, state, 10000 );
    });
}


const tempRedBdrm = async () => {
    v3.discovery.nupnpSearch().then(searchResults => {
        const host = searchResults[0].ipaddress;
        return v3.api.createLocal(host).connect('94zMO3H90hp1h2PknadE4U-ossCSC8MWDj-6Spht');
    }).then(api => {
        api.lights.getLightState(1).then(state => {
            if (state.on == true){
                stateCache.set('light1', state, 500);
                setTimeout(function(){
                    const state = new LightState().on().brightness(50).xy(0.65,0.35).transitionFast();
                    api.lights.setLightState(1, state);
                    //Log
                    console.log('Light 1 is Red');
                }, 500);
                setTimeout(function(){
                    const state = stateCache.get('light1');
                    api.lights.setLightState(1, state);
                    //Log
                    console.log('Reverted back to last state light1');
                }, 5000);
                setTimeout(function(){
                    stateCache.del('light1');
                    //Log
                    console.log('Deleted light1 state cache');
                }, 6000);
            }
            else {
                console.log('Light 1 was off skipping tempFunction');
            }
        });
        api.lights.getLightState(3).then(state => {
            if (state.on == true){
                stateCache.set('light3', state, 500);
                setTimeout(function(){
                    const state = new LightState().on().brightness(50).xy(0.65,0.35).transitionFast();
                    api.lights.setLightState(3, state);
                    console.log('Light 3 is Red');
                }, 500);
                setTimeout(function(){
                    const state = stateCache.get('light3');
                    api.lights.setLightState(3, state);
                    console.log('Reverted back to last state light3');
                }, 5000);
                setTimeout(function(){
                    stateCache.del('light3');
                    console.log('Deleted light3 state cache');
                }, 6000);
            }
            else {
                console.log('Light 3 was off skipping tempFunction');
            }
        });

    }).then(() => {
    console.log(`Light state change was successful?`);
    });
}


module.exports = {
    getLightstateAndCache,
    tempRedBdrm,
};
