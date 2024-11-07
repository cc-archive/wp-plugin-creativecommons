// Import necessary styles
import './style.scss';
import './editor.scss';

// Use globals for plugin directory URL
import globals from 'cgbGlobal';

// Import necessary WordPress packages
const { __ } = wp.i18n; // Internationalization
const { registerBlockType } = wp.blocks; // Block registration
const { InspectorControls, PanelColorSettings } = wp.blockEditor; // Inspector controls for block settings
const { RichText } = wp.blockEditor; // RichText for editable content

/**
 * Register: CC-BY-ND Gutenberg block.
 */
registerBlockType('cc/cc-by-nd', {
    title: __('CC-BY-ND', 'creativecommons'),
    icon: 'media-text',
    category: 'cc-licenses',
    keywords: [__('creative commons', 'creativecommons'), __('CC-BY-ND', 'creativecommons'), __('nd', 'creativecommons')],
    attributes: {
        bgColor: {
            type: 'string',
            default: 'white'
        },
        txtColor: {
            type: 'string',
            default: 'black'
        },
        contentName: {
            selector: '.cc-cgb-name',
            source: 'children'
        },
        contentText: {
            selector: '.cc-cgb-text',
            source: 'children'
        }
    },

    /**
     * The edit function describes the structure of your block in the context of the editor.
     */
    edit: function (props) {
        const { attributes, setAttributes, className } = props;
        const { bgColor, txtColor, contentName, contentText } = attributes;

        const onChangeContentName = (newContentName) => {
            setAttributes({ contentName: newContentName });
        };

        const onChangeContentText = (newContentText) => {
            setAttributes({ contentText: newContentText });
        };

        return (
            <>
                <InspectorControls>
                    <PanelColorSettings
                        title={__('Color Settings', 'creativecommons')}
                        colorSettings={[
                            {
                                label: __('Background Color', 'creativecommons'),
                                value: bgColor,
                                onChange: (colorValue) => setAttributes({ bgColor: colorValue })
                            },
                            {
                                label: __('Text Color', 'creativecommons'),
                                value: txtColor,
                                onChange: (colorValue) => setAttributes({ txtColor: colorValue })
                            }
                        ]}
                    />
                </InspectorControls>

                <div className={className} style={{ backgroundColor: bgColor, color: txtColor }}>
                    <img src={`${globals.pluginDirUrl}includes/images/by-nd.png`} alt="CC-BY-ND" width="88" height="31" />
                    <p>
                        This content is licensed by{' '}
                        <a href="https://creativecommons.org/licenses/by-nd/4.0/" rel="license">
                            Creative Commons Attribution-NoDerivatives 4.0 International license.
                        </a>
                    </p>
                    <h4>Edit</h4>
                    <span>
                        Attribution name <i>(default: This content)</i>:
                    </span>
                    <div className="cc-cgb-richtext-input">
                        <RichText
                            className={className}
                            placeholder={__('This content', 'CreativeCommons')}
                            keepPlaceholderOnFocus={true}
                            onChange={onChangeContentName}
                            value={contentName}
                        />
                    </div>
                    <span>
                        <br />
                        Additional text <i>(optional)</i>:
                    </span>
                    <div className="cc-cgb-richtext-input">
                        <RichText
                            className={className}
                            placeholder={__('Custom text/description/links', 'CreativeCommons')}
                            keepPlaceholderOnFocus={true}
                            onChange={onChangeContentText}
                            value={contentText}
                        />
                    </div>
                </div>
            </>
        );
    },

    /**
     * The save function defines the final markup for the block.
     */
    save: function (props) {
        const { bgColor, txtColor, contentName, contentText } = props.attributes;
        const finalContentName = contentName || __('This content', 'creativecommons'); // Default value

        return (
            <div className="message-body" style={{ backgroundColor: bgColor, color: txtColor }}>
                <img src={`${globals.pluginDirUrl}includes/images/by-nd.png`} alt="CC-BY-ND" width="88" height="31" />
                <p>
                    <span className="cc-cgb-name">{finalContentName}</span> is licensed under a{' '}
                    <a href="https://creativecommons.org/licenses/by-nd/4.0/" rel="license">
                        Creative Commons Attribution-NoDerivatives 4.0 International license.
                    </a>{' '}
                    <span className="cc-cgb-text">{contentText}</span>
                </p>
            </div>
        );
    }
});
