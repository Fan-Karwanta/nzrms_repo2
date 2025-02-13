import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
    fr: {
        ADD_IMAGE: 'Ajouter une image principale',
        ADD_IMAGES: 'Ajouter des images supplémentaires',
        UPDATE_IMAGE: "Modifier l'image principale",
        DELETE_IMAGE: 'Êtes-vous sûr de vouloir supprimer cette image ?',
    },
    en: {
        ADD_IMAGE: 'Add Main Image',
        ADD_IMAGES: 'Add Other Images / Supporting Documents',
        UPDATE_IMAGE: 'Update Main Image',
        DELETE_IMAGE: 'Are you sure you want to delete this image?',
    }
})

langHelper.setLanguage(strings)
export { strings }
