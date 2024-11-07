import './style.scss';
import './editor.scss';
import globals from 'ccGlobal'; // Updated global namespace
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, PanelColorSettings, RichText } = wp.blockEditor; // Import from wp.blockEditor

/**
 * Register: CC-BY-NC Gutenberg block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cc/cc-by-nc', { // Updated namespace
	title: __('CC-BY-NC'),
	icon: 'media-text',
	category: 'cc-licenses',
	keywords: [__('creative commons'), __('CC-BY-NC'), __('attribution')],
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
			selector: '.cc-c-name', // Updated selector for new namespace
			source: 'children'
		},
		contentText: {
			selector: '.cc-c-text', // Updated selector for new namespace
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
		const bgColor = props.attributes.bgColor;
		const txtColor = props.attributes.txtColor;
		const contentName = props.attributes.contentName;
		const contentText = props.attributes.contentText;
		const { className, setAttributes } = props;

		const onChangeContentName = contentName => {
			setAttributes({ contentName });
		};
		const onChangeContentText = contentText => {
			setAttributes({ contentText });
		};

		return [
			<InspectorControls key="3">
				<PanelColorSettings
					title={__('Color Settings', 'creativecommons')}
					colorSettings={[
						{
							label: __('Background Color'),
							value: bgColor,
							onChange: colorValue => setAttributes({ bgColor: colorValue })
						},
						{
							label: __('Text Color'),
							value: txtColor,
							onChange: colorValue => setAttributes({ txtColor: colorValue })
						}
					]}
				/>
			</InspectorControls>,

			<div key="2" className={className} style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${globals.pluginDirUrl}includes/images/by-nc.png`} alt="CC-BY-NC" width="88" height="31" />
				<p>
					This content is licensed by{' '}
					<a href="https://creativecommons.org/licenses/by-nc/4.0" rel="license">
						Creative Commons Attribution-NonCommercial 4.0 International license.
					</a>
				</p>
				<h4>Edit</h4>
				<span>
					Attribution name <i>(default: This content)</i>:
				</span>
				<div className="cc-c-richtext-input"> {/* Updated class name */}
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
				<div className="cc-c-richtext-input"> {/* Updated class name */}
					<RichText
						className={className}
						placeholder={__('Custom text/description/links ', 'CreativeCommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentText}
						value={contentText}
					/>
				</div>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: function(props) {
		const bgColor = props.attributes.bgColor;
		const txtColor = props.attributes.txtColor;
		let contentName = props.attributes.contentName;
		const contentText = props.attributes.contentText;

		if (contentName === '') {
			contentName = 'This content'; // Default to "This Content".
		}
		return (
			<div className="message-body" style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${globals.pluginDirUrl}includes/images/by-nc.png`} alt="CC-BY-NC" width="88" height="31" />
				<p>
					<span className="cc-c-name">{contentName}</span> is licensed under a{' '} {/* Updated class name */}
					<a href="https://creativecommons.org/licenses/by-nc/4.0" rel="license">
						Creative Commons Attribution-NonCommercial 4.0 International license.
					</a>{' '}
					<span className="cc-c-text">{contentText}</span> {/* Updated class name */}
				</p>
			</div>
		);
	}
});
