import './style.scss';
import './editor.scss';
import globals from 'cgbGlobal';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, PanelColorSettings } = wp.blockEditor; // Import color settings from wp.blockEditor
const { RichText } = wp.blockEditor; // Import RichText from wp.blockEditor

/**
 * Register: CC0 Gutenberg block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is available as an option in any
 * editor interface where blocks are implemented.
 *
 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cc/cc0', { // Updated namespace to "cc"
	title: __('CC0', 'creativecommons'),
	icon: 'media-text',
	category: 'cc-licenses',
	keywords: [__('creative commons'), __('cc0'), __('attribution')],
	attributes: {
		bgColor: {
			type: 'string',
			default: 'white',
		},
		txtColor: {
			type: 'string',
			default: 'black',
		},
		contentName: {
			selector: '.cc-name', // Updated CSS class
			source: 'children',
		},
		contentText: {
			selector: '.cc-text', // Updated CSS class
			source: 'children',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: function (props) {
		const { attributes: { bgColor, txtColor, contentName, contentText }, setAttributes, className } = props;

		const onChangeContentName = contentName => setAttributes({ contentName });
		const onChangeContentText = contentText => setAttributes({ contentText });

		return [
			<InspectorControls key="3">
				<PanelColorSettings
					title={__('Color Settings', 'creativecommons')}
					colorSettings={[
						{
							label: __('Background Color', 'creativecommons'),
							value: bgColor,
							onChange: (colorValue) => setAttributes({ bgColor: colorValue }),
						},
						{
							label: __('Text Color', 'creativecommons'),
							value: txtColor,
							onChange: (colorValue) => setAttributes({ txtColor: colorValue }),
						},
					]}
				/>
			</InspectorControls>,

			<div key="2" className={className} style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${globals.pluginDirUrl}includes/images/cc0.png`} alt="CC0" />
				<p>
					This content is licensed by{' '}
					<a href="https://creativecommons.org/publicdomain/zero/1.0/" rel="license">
						Creative Commons CC0 Universal Public Domain Dedication license.
					</a>
				</p>
				<h4>Edit</h4>
				<span>
					Attribution name <i>(default: This content)</i>:
				</span>
				<div className="cc-richtext-input">
					<RichText
						placeholder={__('This content', 'creativecommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentName}
						value={contentName}
					/>
				</div>
				<span>
					Additional text <i>(optional)</i>:
				</span>
				<div className="cc-richtext-input">
					<RichText
						placeholder={__('Custom text/description/links', 'creativecommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentText}
						value={contentText}
					/>
				</div>
			</div>,
		];
	},

	/**
	 * The save function defines how the block's attributes should be combined
	 * into the final markup, which Gutenberg serializes into post_content.
	 *
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: function (props) {
		const { bgColor, txtColor, contentName = 'This content', contentText } = props.attributes;

		return (
			<div className="cc-message-body" style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${globals.pluginDirUrl}includes/images/cc0.png`} alt="CC0" />
				<p>
					<span className="cc-name">{contentName}</span> is licensed under a{' '}
					<a href="https://creativecommons.org/publicdomain/zero/1.0/" rel="license">
						Creative Commons CC0 Universal Public Domain Dedication license.
					</a>{' '}
					<span className="cc-text">{contentText}</span>
				</p>
			</div>
		);
	},
});
