import { createHigherOrderComponent, withState } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { PanelBody, TextControl, ClipboardButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

const allowedBlocks = [
	'core/audio',
];

/**
 * Create HOC to add controls to inspector controls of block.
 */
const withAudioURLControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Skip if not audio block or block does not have src attribute set.
		if ( !allowedBlocks.includes( props.name ) || !props.attributes.src || '' === props.attributes.src ) {
			return (
				<BlockEdit {...props} />
			);
		}

		// Clipboard button to copy URL.
		const MyClipboardButton = withState( {
			hasCopied: false,
		} )( ( { hasCopied, setState } ) => (
			<ClipboardButton
				isPrimary
				text={props.attributes.src}
				onCopy={() => setState( { hasCopied: true } )}
				onFinishCopy={() => setState( { hasCopied: false } )}
			>
				{hasCopied ? __( 'Copied!' ) : __( 'Copy URL' )}
			</ClipboardButton>
		) );

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__( 'Audio URL' )}
						initialOpen={true}
					>
						<TextControl
							label={__( 'URL' )}
							value={props.attributes.src}
							disabled
						/>
						<MyClipboardButton />
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withAudioURLControl' );

addFilter( 'editor.BlockEdit', 'extend-audio-block/with-audio-control', withAudioURLControl );
