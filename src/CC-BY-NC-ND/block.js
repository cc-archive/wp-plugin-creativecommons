import './style.scss';
import './editor.scss';
import globals from 'cgbGlobal';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, PanelColorSettings } = wp.blockEditor; // Import color settings from wp.blockEditor
const { RichText } = wp.blockEditor; // Import RichText from wp.blockEditor

/**
 * Register: CC-BY-NC-ND Gutenberg block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cc/cc-by-nc-nd', { // Updated namespace
	title: __('CC-BY-NC-ND', 'creativecommons'),
	icon: 'media-text',
	category: 'cc-licenses',
	keywords: [__('creative commons'), __('CC-BY-NC-ND'), __('nc nd')],
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
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: function(props) {
		const { bgColor, txtColor, contentName, contentText } = props.attributes;
		const { className, setAttributes } = props;

		const onChangeContentName = newContentName => {
			setAttributes({ contentName: newContentName });
		};

		const onChangeContentText = newContentText => {
			setAttributes({ contentText: newContentText });
		};

		return [
			<InspectorControls key="controls">
				<PanelColorSettings
					title={__('Color Settings', 'creativecommons')}
					colorSettings={[
						{
							label: __('Background Color', 'creativecommons'),
							value: bgColor,
							onChange: colorValue => setAttributes({ bgColor: colorValue })
						},
						{
							label: __('Text Color', 'creativecommons'),
							value: txtColor,
							onChange: colorValue => setAttributes({ txtColor: colorValue })
						}
					]}
				/>
			</InspectorControls>,

			<div key="block" className={className} style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${globals.pluginDirUrl}includes/images/by-nc-nd.png`} alt="CC-BY-NC-ND" width="88" height="31" />
				<p>
					This content is licensed by{' '}
					<a href="https://creativecommons.org/licenses/by-nc-nd/4.0" rel="license">
						Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license.
					</a>
				</p>
				<h4>{__('Edit', 'creativecommons')}</h4>
				<span>
					{__('Attribution name (default: This content):', 'creativecommons')}
				</span>
				<div className="cc-cgb-richtext-input">
					<RichText
						className={className}
						placeholder={__('This content', 'creativecommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentName}
						value={contentName}
					/>
				</div>
				<span>
					<br />
					{__('Additional text (optional):', 'creativecommons')}
				</span>
				<div className="cc-cgb-richtext-input">
					<RichText
						className={className}
						placeholder={__('Custom text/description/links', 'creativecommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentText}
						value={contentText}
					/>
				</div>
			</div>
		];
	},

	/**
	 * The save function defines how the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: function(props) {
		const { bgColor, txtColor, contentName, contentText } = props.attributes;

		const displayName = contentName || __('This content', 'creativecommons'); // Default to "This Content"
		
		return (
			<div className="message-body" style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${globals.pluginDirUrl}includes/images/by-nc-nd.png`} alt="CC-BY-NC-ND" width="88" height="31" />
				<p>
					<span className="cc-cgb-name">{displayName}</span> is licensed under a{' '}
					<a href="https://creativecommons.org/licenses/by-nc-nd/4.0" rel="license">
						Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license.
					</a>{' '}
					<span className="cc-cgb-text">{contentText}</span>
				</p>
			</div>
		);
	}
});
