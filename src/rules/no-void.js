/**
 * @fileoverview Rule to disallow use of void operator.
 * @author Mike Sidorov
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

EsCheck.Rule.new({
    meta: {
        type: "suggestion",

        docs: {
            description: "Disallow `void` operators",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-void"
        },

        messages: {
            noVoid: "Expected 'undefined' and instead saw 'void'."
        },

        schema: [
            {
                type: "object",
                properties: {
                    allowAsStatement: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const allowAsStatement =
            context.options[0] && context.options[0].allowAsStatement;

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            'UnaryExpression[operator="void"]'(node) {
                if (
                    allowAsStatement &&
                    node.parent &&
                    node.parent.type === "ExpressionStatement"
                ) {
                    return;
                }
                context.report({
                    node,
                    messageId: "noVoid"
                });
            }
        };
    }
});
