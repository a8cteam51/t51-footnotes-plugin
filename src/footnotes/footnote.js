import { v4 as uuid } from 'uuid';
import { __ } from '@wordpress/i18n';

import {
	createBlock,
	registerBlockType,
} from '@wordpress/blocks';

import {
	useDispatch,
	useSelect,
} from '@wordpress/data';

import {
	registerFormatType,
	applyFormat,
	removeFormat,
	create,
	insert,
	remove,
} from '@wordpress/rich-text';

import {
	RichTextToolbarButton,
	InnerBlocks,
} from '@wordpress/block-editor';

const name  = 't51/footnote';
const title = __( 'Footnote' );

registerFormatType( name, {
	title,
	tagName: 'span',
	className: 'footnote-marker',
	attributes: {
		id: 'data-id',
	},
	edit( { isActive, value, onChange, onFocus } ) {
		const {
			insertBlock,
		} = useDispatch( 'core/block-editor' );

		const {
			getSelectedBlockClientId,
			getBlockIndex,
		} = useSelect( select => select( 'core/block-editor' ) );

		// When a footnote is added, automatically create an associated
		// t51/footnote block below the block the footnote is added to.
		function onToggle() {
			const id            = uuid();
			const matchingBlock = createBlock( name, { footnoteId: id } );
			const blockIndex    = getBlockIndex( getSelectedBlockClientId() ) + 1; // Insert after the current block.

			insertBlock( matchingBlock, blockIndex );

			// Insert a span at the end of the selection that is associated with a footnote.
			const toInsert = applyFormat( create( { html: '<span class="footnote-marker" data-id="' + id + '"><mark>θ</mark></span>' } ), {
				type: name,
				attributes: {
					id,
				}
			} );
			let newAttributes = insert( value, toInsert, value.end, value.end );

			newAttributes.start = newAttributes.end;
			newAttributes.activeFormats = [];

			onChange( { ...newAttributes, needsSelectionUpdate: true } );
		}

		// When a footnote is removed, remove the footnote markup, but leave the
		// footnote block.
		function onRemoveFormat() {
			const toRemove = removeFormat( value, name, value.start, value.end );
			let newAttributes = remove( toRemove, value.start, value.end );

			onChange( { ...newAttributes, needsSelectionUpdate: true } );
		}

		function onClick() {
			onToggle();
			onFocus();
		}

		return (
			<>
				{ isActive && (
					<RichTextToolbarButton
						icon='editor-code'
						title={ __( 'Remove footnote' ) }
						onClick={ onRemoveFormat }
						isActive={ isActive }
					/>
				) }
				{ ! isActive && (
					<RichTextToolbarButton
						icon='editor-code'
						title={ title }
						onClick={ onClick }
						isActive={ isActive }
					/>
				) }
			</>
		);
	},
} );

// Register the footnote block, which is a container for other blocks.
registerBlockType( name, {
	title,
	keywords: ['footnote'],

	attributes: {
		footnoteId: {
			type: 'string',
		}
	},

	supports: {
		// We provide an automatically generated anchor.
		anchor: false,

		// It should not be possible to edit this block as HTML.
		html: false,

		// This block should only be inserted via the footnote format.
		inserter: false,

		// This is a programattic block, reusing seems scary.
		reusable: false,
	},

	edit: () => {
		return <InnerBlocks
			allowedBlocks={ [ 'core/paragraph' ] }
		/>;
	},

	save: ( { attributes } ) => {
		const { footnoteId } = attributes;

		const anchorId = 'footnote-' + footnoteId;
		const href     = '#rn-ret-' + footnoteId;

		return <div id={ anchorId } className="footnote">
			<span className="footnote-marker"><mark>↩</mark></span>
			<InnerBlocks.Content />
		</div>;
	}
} );
