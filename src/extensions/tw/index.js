const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for TurboWarp blocks
 * @constructor
 */
class TurboWarpBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'tw',
            name: 'TurboWarp',
            color1: '#ff4c4c',
            color2: '#e64444',
            docsURI: 'https://docs.turbowarp.org/blocks',
            blocks: [
                {
                    opcode: 'getLastKeyPressed',
                    text: formatMessage({
                        id: 'tw.blocks.lastKeyPressed',
                        default: 'last key pressed',
                        description: 'Block that returns the last key that was pressed'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'rumbleGamepad',
                    text: formatMessage({
                        id: 'tw.blocks.rumbleGamepad',
                        default: 'rumble [GAMEPAD_ID] duration: [DURATION] magnitude: [MAGNITUDE]',
                        description: 'Turns on rumble (vibration effect) for a specified gamepad'
                    }),
                    arguments: {
                        GAMEPAD_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'gamepadList',
                            defaultValue: '0'
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        MAGNITUDE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'vibrateGamepad',
                    text: formatMessage({
                        id: 'tw.blocks.vibrateGamepad',
                        default: 'vibrate gamepad: [GAMEPAD_ID] duration: [DURATION] magnitude: [MAGNITUDE]',
                        description: 'Turns on vibrate (vibration effect) for a specified gamepad'
                    }),
                    arguments: {
                        GAMEPAD_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'gamepadList',
                            defaultValue: '0'
                        },
                        DURATION1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        MAGNITUDE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'getButtonIsDown',
                    text: formatMessage({
                        id: 'tw.blocks.buttonIsDown',
                        default: '[MOUSE_BUTTON] mouse button down?',
                        description: 'Block that returns whether a specific mouse button is down'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        MOUSE_BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'mouseButton',
                            defaultValue: '0'
                        }
                    }
                }
            ],
            menus: {
                mouseButton: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.primary',
                                default: '(0) primary',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.middle',
                                default: '(1) middle',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.secondary',
                                default: '(2) secondary',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '2'
                        }
                    ],
                    acceptReporters: true
                },
                effects: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.effects.dualRumble',
                                default: 'Dual Rumble',
                                description: 'Dual Rumble Gamepad Effect'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.effects.vibration',
                                default: 'Vibration',
                                description: 'Vibration Gamepad Effect'
                            }),
                            value: '0'
                        }
                    ],
                    acceptReporters: true
                },
                gamepadList: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.default',
                                default: 'Gamepad (1)',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.middle',
                                default: 'Gamepad (2)',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.secondary',
                                default: 'Gamepad (3)',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '2'
                        }
                    ],
                    acceptReporters: true
                },
                stickList: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.stickList.left',
                                default: 'left',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: 'left'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.stickList.right',
                                default: 'right',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: 'right'
                        }
                    ],
                    acceptReporters: true
                },
                axisList: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.axisList.x',
                                default: 'x',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: 'x'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.axisList.y',
                                default: 'y',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: 'y'
                        }
                    ],
                    acceptReporters: true
                }
            }
        };
    }

    getLastKeyPressed(args, util) {
        return util.ioQuery('keyboard', 'getLastKeyPressed');
    }

    rumbleGamepad(args, util) {
        // console.log("Hello!");
        const gamepad = navigator.getGamepads()[args.GAMEPAD_ID];
        gamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: args.DURATION,
            weakMagnitude: args.MAGNITUDE,
            strongMagnitude: args.MAGNITUDE
        });
    }

    vibrateGamepad(args, util) {
        // console.log("Hello!");
        const gamepad = navigator.getGamepads()[args.GAMEPAD_ID];
        gamepad.vibrationActuator.playEffect('vibration', {
            startDelay: 0,
            duration: args.DURATION * 1000,
            weakMagnitude: args.MAGNITUDE,
            strongMagnitude: args.MAGNITUDE
        });
    }

    getButtonIsDown(args, util) {
        const button = Cast.toNumber(args.MOUSE_BUTTON);
        return util.ioQuery('mouse', 'getButtonIsDown', [button]);
    }
}

module.exports = TurboWarpBlocks;
