import './style.scss';
import './editor.scss';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, PanelColorSettings, RichText } from '@wordpress/block-editor';

/**
 * Register: CC-BY Gutenberg block.
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
registerBlockType('cc/cc-by', {
	title: __('CC-BY'),
	icon: 'media-text',
	category: 'cc-licenses',
	keywords: [__('creative commons'), __('CC-BY'), __('attribution')],
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
			selector: '.cc-name',
			source: 'children',
		},
		contentText: {
			selector: '.cc-text',
			source: 'children',
		},
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
	edit: function (props) {
		const { bgColor, txtColor, contentName, contentText } = props.attributes;
		const { setAttributes } = props;

		const onChangeContentName = contentName => setAttributes({ contentName });
		const onChangeContentText = contentText => setAttributes({ contentText });

		return [
			<InspectorControls key="3">
				<PanelColorSettings
					title={__('Color Settings', 'creativecommons')}
					colorSettings={[
						{
							label: __('Background Color'),
							value: bgColor,
							onChange: colorValue => setAttributes({ bgColor: colorValue }),
						},
						{
							label: __('Text Color'),
							value: txtColor,
							onChange: colorValue => setAttributes({ txtColor: colorValue }),
						},
					]}
				/>
			</InspectorControls>,

			<div key="2" style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${pluginDirUrl}/includes/images/by.png`} alt="CC-BY" width="88" height="31" />
				<p>
					This content is licensed by{' '}
					<a href="https://creativecommons.org/licenses/by/4.0/" rel="license">
						Creative Commons Attribution 4.0 International license.
					</a>
				</p>
				<h4>Edit</h4>
				<span>
					Attribution name <i>(default: This content)</i>:
				</span>
				<div className="cc-richtext-input">
					<RichText
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
				<div className="cc-richtext-input">
					<RichText
						placeholder={__('Custom text/description/links ', 'CreativeCommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentText}
						value={contentText}
					/>
				</div>
			</div>,
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
	save: function (props) {
		const { bgColor, txtColor, contentName, contentText } = props.attributes;

		return (
			<div className="message-body" style={{ backgroundColor: bgColor, color: txtColor }}>
				<img src={`${pluginDirUrl}/includes/images/by.png`} alt="CC" width="88" height="31" />
				<p>
					<span className="cc-name">{contentName || 'This content'}</span> is licensed under a{' '}
					<a href="https://creativecommons.org/licenses/by/4.0/" rel="license">
						Creative Commons Attribution 4.0 International license.
					</a>{' '}
					<span className="cc-text">{contentText}</span>
				</p>
			</div>
		);
	},
});
