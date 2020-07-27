const { BlockUtil, InputUtil, StatementUtil, CompiledInput } = require('./block-common');

/**
 * @returns {Object.<string, (util: StatementUtil) => void>}
 */
module.exports.getStatements = () => {
    return {
        looks_hide: hide,
        looks_show: show,
        looks_gotofrontback: goToFrontBack,
        looks_goforwardbackwardlayers: goForwardBackwardsLayers,
        looks_setsizeto: setSize,
        looks_changesizeby: changeSize,
        looks_switchcostumeto: switchCostume,
        looks_cleargraphiceffects: clearEffects,
        looks_switchbackdropto: switchBackdrop,
    };
};

/**
 * @returns {Object.<string, (util: InputUtil) => CompiledInput>}
 */
module.exports.getInputs = () => {
    return {
        looks_costume: costumeMenu,
        looks_backdrops: backdropMenu,
        looks_costumenumbername: getCostumeNumberName,
        looks_backdropnumbername: getBackdropNumberName,
        looks_size: getSize,
    };
};

const hide = /** @param {StatementUtil} util */ (util) => {
    util.writeLn('target.setVisible(false);');
    util.writeLn('runtime.ext_scratch3_looks._renderBubble(target);');
};

const show = /** @param {StatementUtil} util */ (util) => {
    util.writeLn('target.setVisible(true);');
    util.writeLn('runtime.ext_scratch3_looks._renderBubble(target);');
};

const goToFrontBack = /** @param {StatementUtil} util */ (util) => {
    if (util.isStage) {
        return;
    }
    const FRONT_BACK = util.fieldValueUnsafe('FRONT_BACK');
    if (FRONT_BACK === 'front') {
        util.writeLn('target.goToFront();');
    } else {
        util.writeLn('target.goToBack();')
    }
};

const goForwardBackwardsLayers = /** @param {StatementUtil} util */ (util) => {
    if (util.isStage) {
        return;
    }
    const FORWARD_BACKWARD = util.fieldValueUnsafe('FORWARD_BACKWARD');
    const NUM = util.input('NUM');
    if (FORWARD_BACKWARD === 'forward') {
        util.writeLn(`target.goForwardLayers(${NUM.asNumber()});`);
    } else {
        util.writeLn(`target.goBackwardLayers(${NUM.asNumber()});`);
    }
};

const setSize = /** @param {StatementUtil} util */ (util) => {
    const SIZE = util.input('SIZE');
    util.writeLn(`target.setSize(${SIZE.asNumber()});`);
};

const changeSize = /** @param {StatementUtil} util */ (util) => {
    const CHANGE = util.input('CHANGE');
    util.writeLn(`target.setSize(target.size + ${CHANGE.asNumber()});`);
};

const switchCostume = /** @param {StatementUtil} util */ (util) => {
    const COSTUME = util.input('COSTUME');
    // do not cast COSTUME: behavior depends on type
    util.writeLn(`runtime.ext_scratch3_looks._setCostume(target, ${COSTUME});`);
};

const costumeMenu = /** @param {InputUtil} util */ (util) => {
    return util.fieldString('COSTUME');
};

const backdropMenu = /** @param {InputUtil} util */ (util) => {
    return util.fieldString('BACKDROP');
};

const getCostumeNumberName = /** @param {InputUtil} util */ (util) => {
    const NUMBER_NAME = util.fieldValueUnsafe('NUMBER_NAME');
    if (NUMBER_NAME === 'number') {
        return util.number('(target.currentCostume + 1)');
    }
    return util.string('target.getCostumes()[target.currentCostume].name');
};

const getBackdropNumberName = /** @param {InputUtil} util */ (util) => {
    const NUMBER_NAME = util.fieldValueUnsafe('NUMBER_NAME');
    if (NUMBER_NAME === 'number') {
        return util.number('(stage.currentCostume + 1)');
    }
    return util.string('stage.getCostumes()[stage.currentCostume].name');
};

const clearEffects = /** @param {StatementUtil} util */ (util) => {
    util.writeLn(`target.clearEffects();`);
};

const switchBackdrop = /** @param {StatementUtil} util */ (util) => {
    const BACKDROP = util.input('BACKDROP');
    // do not cast BACKDROP: behavior depends on type
    util.writeLn(`runtime.ext_scratch3_looks._setBackdrop(stage, ${BACKDROP});`);
};

const getSize = /** @param {InputUtil} util */ (util) => {
    return util.number('Math.round(target.size)');
};