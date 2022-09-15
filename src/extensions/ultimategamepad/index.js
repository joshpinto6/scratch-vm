const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');


/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/png;base64,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';

/**
 * Class for TurboWarp blocks
 * @constructor
 */
class GamepadBlocks {
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
            id: 'ultimategamepad',
            name: 'Ultimate Gamepad',
            color1: '#5cabbf',
            blockIconURI: iconURI,
            color2: '#4895a3',
            docsURI: 'https://docs.turbowarp.org/blocks',
            blocks: [
                {
                    opcode: 'getDeviceName',
                    text: formatMessage({
                        id: 'gamepad.blocks.getDeviceName',
                        default: 'get [GAMEPAD_ID] device id',
                        description: 'Returns the device id of a connected gamepad from the given index.'
                    }),
                    arguments: {
                        GAMEPAD_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'gamepadListNums',
                            defaultValue: '1'
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getButtonId',
                    text: formatMessage({
                        id: 'gamepad.blocks.getButtonId',
                        default: 'get button [BUTTON]',
                        description: 'Returns the button index from a given button name.'
                    }),
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'buttons',
                            defaultValue: '1'
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getAxisStrength',
                    text: formatMessage({
                        id: 'gamepad.blocks.getAxisStrength',
                        default: '[GAMEPAD_ID] [STICK] stick [AXIS] strength',
                        description: 'Returns the strength of a gamepad joystick in a given axis direction.'
                    }),
                    arguments: {
                        GAMEPAD_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'gamepadListNums',
                            defaultValue: '0'
                        },
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'axisList',
                            defaultValue: 'x-axis'
                        },
                        STICK: {
                            type: ArgumentType.STRING,
                            menu: 'stickList',
                            defaultValue: 'left'
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getButtonPressed',
                    text: formatMessage({
                        id: 'gamepad.blocks.getButtonPressed',
                        default: '[GAMEPAD_ID] button [BUTTON] pressed',
                        description: 'Returns the strength of a gamepad joystick in a given axis direction.'
                    }),
                    arguments: {
                        GAMEPAD_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'gamepadList',
                            defaultValue: '0'
                        },
                        BUTTON: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0',
                            menu: 'buttons'
                        }
                    },
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'whenButtonPressed',
                    text: formatMessage({
                        id: 'gamepad.blocks.whenButtonPressed',
                        default: 'when [GAMEPAD_ID] button [BUTTON] pressed',
                        description: 'Called when a button is pressed on the given gamepad.'
                    }),
                    arguments: {
                        GAMEPAD_ID: {
                            type: ArgumentType.NUMBER,
                            menu: 'gamepadList',
                            defaultValue: '0'
                        },
                        BUTTON: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0',
                            menu: 'buttons'
                        }
                    },
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'browserSupported',
                    text: formatMessage({
                        id: 'gamepad.blocks.whenButtonPressed',
                        default: 'does browser support gamepads?',
                        description: 'Returns true/false based on browser support for the Gamepad API.'
                    }),
                    arguments: {},
                    blockType: BlockType.BOOLEAN
                }
            ],
            menus: {
                gamepadList: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.anygamepad',
                                default: '(0) Any Gamepad',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.gamepad3',
                                default: '(1) Gamepad 1',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.gamepad2',
                                default: '(2) Gamepad 2',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '2'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.secondary',
                                default: '(3) Gamepad 3',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '3'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.secondary',
                                default: '(4) Gamepad 4',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '4'
                        }
                    ],
                    acceptReporters: true
                },
                gamepadListNums: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadListNums.default',
                                default: '(1) Gamepad 1',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadListNums.middle',
                                default: '(2) Gamepad 1',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '2'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadListNums.secondary',
                                default: '(3) Gamepad 3',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '3'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.gamepadList.secondary',
                                default: '(4) Gamepad 4',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '4'
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
                buttons: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'd-pad up',
                            value: '12'
                        },
                        {
                            text: 'd-pad down',
                            value: '13'
                        },
                        {
                            text: 'd-pad right',
                            value: '15'
                        },
                        {
                            text: 'd-pad left',
                            value: '14'
                        },
                        {
                            text: 'cross (A)',
                            value: '0'
                        },
                        {
                            text: 'circle (B)',
                            value: '1'
                        },
                        {
                            text: 'square (X)',
                            value: '2'
                        },
                        {
                            text: 'triangle (Y)',
                            value: '3'
                        },
                        {
                            text: 'left stick',
                            value: '10'
                        },
                        {
                            text: 'right stick',
                            value: '11'
                        },
                        {
                            text: 'left shoulder',
                            value: '4'
                        },
                        {
                            text: 'right shoulder',
                            value: '5'
                        },
                        {
                            text: 'left trigger',
                            value: '6'
                        },
                        {
                            text: 'right trigger',
                            value: '7'
                        },
                        {
                            text: 'share (view/minus)',
                            value: '8'
                        },
                        {
                            text: 'options (menu/plus)',
                            value: '9'
                        },
                        {
                            text: 'touch pad',
                            value: '17'
                        },
                        {
                            text: 'PS (Xbox)',
                            value: '16'
                        }
                    ]
                },
                axisList: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.axisList.x',
                                default: 'x-axis',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: 'x-axis'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.axisList.y',
                                default: 'y-axis',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: 'y-axis'
                        }
                    ],
                    acceptReporters: false
                }
            }
        };
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

    browserSupported(args, util) {
        const hasGamepadAPI = () => 'getGamepads' in navigator;
        return hasGamepadAPI;
    }

    getButtonPressed(args, util) {
        let gamepadPressed = false;
        console.log(args.GAMEPAD_ID);
        if (args.GAMEPAD_ID === 0) {
            for (let i = 0; i < navigator.getGamepads().length; i++) {
                const gamepad = navigator.getGamepads()[i];
                if (gamepad.buttons[parseInt(args.BUTTON, 10)].pressed) {
                    gamepadPressed = true;
                }
            }
            // gamepads.forEach(gamepad => {
            //     console.log(gamepad);
            //     if (gamepad.buttons[parseInt(args.BUTTON, 10)].pressed) {
            //         gamepadPressed = true;
            //     }
            // });
        } else {
            const gamepad = navigator.getGamepads()[parseInt(args.GAMEPAD_ID, 10) - 1];
            if (gamepad === null) {
                return 'Gamepads Not connected!';
            }
            gamepadPressed = gamepad.buttons[parseInt(args.BUTTON, 10)].pressed;
        }
        return gamepadPressed;
    }

    getButtonId(args, util) {
        return args.BUTTON;
    }

    whenButtonPressed(args, util) {
        let gamepadPressed = false;
        if (parseInt(args.GAMPAD_ID, 10) === 0) {
            const gamepads = navigator.getGamepads();
            gamepads.forEach(gamepad => {
                if (gamepad.buttons[parseInt(args.BUTTON, 10)].pressed) {
                    gamepadPressed = true;
                }
            });
        } else {
            const gamepad = navigator.getGamepads()[parseInt(args.GAMEPAD_ID, 10) - 1];
            if (gamepad === null) {
                return 'Gamepads Not connected!';
            }
            gamepadPressed = gamepad.buttons[parseInt(args.BUTTON, 10)].pressed;
        }
        return gamepadPressed;
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
    getAxisStrength(args, util) {
        return 'Hello';
    }
    getDeviceName(args, util) {
        const gamepad = navigator.getGamepads()[args.GAMEPAD_ID];
        if (gamepad === null) {
            return '';
        }
        return navigator.getGamepads()[parseInt(args.GAMEPAD_ID, 10) - 1].id;
    }
    whenGamepadConnected(args, util) {
        window.addEventListener('gamepadconnected', event => {
            return true;
        });
        return false;
    }
}

module.exports = GamepadBlocks;
