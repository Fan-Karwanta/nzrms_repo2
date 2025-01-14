import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_PROPERTY: 'Nouvelle propriété',
    DELETE_PROPERTY: 'Êtes-vous sûr de vouloir supprimer cette propriété ?',
    CANCELLATION: 'Annulation',
    CANCELLATION_TOOLTIP: 'La réservation peut être annulée avant la date de commencement de la location.',
    INCLUDED: 'Inclus',
    AVAILABLE: 'Disponile',
    UNAVAILABLE: 'Indisponible',
    PROPERTY_AVAILABLE: 'Disponible à la location',
    PROPERTY_AVAILABLE_TOOLTIP: 'Cette propriété est disponible à la location.',
    PROPERTY_UNAVAILABLE: 'Indisponible à la location',
    PROPERTY_UNAVAILABLE_TOOLTIP: "Cette propriété n'est pas disponible à la location.",
    VIEW_PROPERTY: 'Voir cette propriété',
    EMPTY_LIST: 'Pas de propriétés.',
    CANNOT_DELETE_PROPERTY: 'Cette propriété ne peut pas être supprimée property elle est liée à des réservations. Vous pouvez cependant la rendre indisponible à la location en la modifiant.',
    AVAILABILITY: 'Disponibilité',
    PRICE_DAYS_PART_1: 'Prix pour',
    PRICE_DAYS_PART_2: 'jour',
    PRICE_PER_DAY: 'Prix par jour :',
    HOUSE: 'Maison',
    APARTMENT: 'Appartement',
    PLOT: 'Terrain',
    FARM: 'Ferme',
    COMMERCIAL: 'Local commercial',
    INDUSTRIAL: 'Local industriel',
    TOWN_HOUSE: 'Maison de ville',
    AIRCON_TOOLTIP: 'Cette propriété dispose de la climatisation',
    TOOLTIP_1: 'Cette propriété a ',
    BEDROOMS_TOOLTIP_1: 'chambre à coucher',
    BEDROOMS_TOOLTIP_2: 'chambres à coucher',
    BATHROOMS_TOOLTIP_1: 'salle de bain à coucher',
    BATHROOMS_TOOLTIP_2: 'salles de bain à coucher',
    KITCHENS_TOOLTIP_1: 'cuisine',
    PARKING_SPACES_TOOLTIP_1: 'place à de parking',
    PARKING_SPACES_TOOLTIP_2: 'places à de parking',
    FURNISHED_TOOLTIP: 'Ce bien est meublé',
    YEARS: 'ans',
    VIEW_BOOKINGS: 'Voir les réservations',
    PETS_ALLOWED_TOOLTIP: 'Animaux domestiques autorisés',
  },
  en: {
    NEW_PROPERTY: 'New property',
    DELETE_PROPERTY: 'Are you sure you want to delete this property?',
    CANCELLATION: 'Cancellation',
    CANCELLATION_TOOLTIP: 'The booking can be canceled before the start date of the rental.',
    INCLUDED: 'Included',
    AVAILABLE: 'Available',
    UNAVAILABLE: 'Unavailable',
    PROPERTY_AVAILABLE: 'Available',
    PROPERTY_AVAILABLE_TOOLTIP: 'This property is available for rental.',
    PROPERTY_UNAVAILABLE: 'Unavailable for rental',
    PROPERTY_UNAVAILABLE_TOOLTIP: 'This property is unavailable for rental.',
    VIEW_PROPERTY: 'View this property',
    EMPTY_LIST: 'No properties.',
    CANNOT_DELETE_PROPERTY: 'This property cannot be deleted because it is linked to bookings. However, you can make it unavailable for rental by modifying it.',
    AVAILABILITY: 'Availablity',
    PRICE_DAYS_PART_1: 'Price for',
    PRICE_DAYS_PART_2: 'day',
    PRICE_PER_DAY: 'Price per day:',
    HOUSE: 'House',
    APARTMENT: 'Apartment',
    PLOT: 'Lot',
    FARM: 'Farm',
    COMMERCIAL: 'Commercial',
    INDUSTRIAL: 'Industrial',
    TOWN_HOUSE: 'Town House',
    AIRCON_TOOLTIP: 'This property has aircon',
    TOOLTIP_1: 'This property has ',
    BEDROOMS_TOOLTIP_1: 'bedroom',
    BEDROOMS_TOOLTIP_2: '',
    BATHROOMS_TOOLTIP_1: 'bathroom',
    BATHROOMS_TOOLTIP_2: '',
    KITCHENS_TOOLTIP_1: 'kitchen',
    PARKING_SPACES_TOOLTIP_1: 'parking place',
    PARKING_SPACES_TOOLTIP_2: '',
    FURNISHED_TOOLTIP: 'This property is furnished',
    YEARS: 'years',
    VIEW_BOOKINGS: 'View bookings',
    PETS_ALLOWED_TOOLTIP: 'Pets allowed',
  },
})

langHelper.setLanguage(strings)
export { strings }
