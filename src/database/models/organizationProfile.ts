import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('organizationProfile');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const OrganizationProfileSchema = new Schema(
    {
      companyName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      industry: {
        type: String,
        required: true,
        enum: [
          'Accounting',
          'Airlines/Aviation',
          'Alternative Dispute Resolution',
          'Alternative Medicine',
          'Animation',
          'Apparel & Fashion',
          'Architecture & Planning',
          'Arts and Crafts',
          'Automotive',
          'Aviation & Aerospace',
          'Banking',
          'Biotechnology',
          'Broadcast Media',
          'Building Materials',
          'Business Supplies and Equipment',
          'Capital Markets',
          'Chemicals',
          'Civic & Social Organization',
          'Civil Engineering',
          'Commercial Real Estate',
          'Computer & Network Security',
          'Computer Games',
          'Computer Hardware',
          'Computer Networking',
          'Computer Software',
          'Construction',
          'Consumer Electronics',
          'Consumer Goods',
          'Consumer Services',
          'Cosmetics',
          'Dairy',
          'Defense & Space',
          'Design',
          'Education Management',
          'E-Learning',
          'Electrical/Electronic Manufacturing',
          'Entertainment',
          'Environmental Services',
          'Events Services',
          'Executive Office',
          'Facilities Services',
          'Farming',
          'Financial Services',
          'Fine Art',
          'Fishery',
          'Food & Beverages',
          'Food Production',
          'Fund-Raising',
          'Furniture',
          'Gambling & Casinos',
          'Glass',
          'Ceramics & Concrete',
          'Government Administration',
          'Government Relations',
          'Graphic Design',
          'Health',
          'Wellness and Fitness',
          'Higher Education',
          'Horticulture',
          'Hospital & Health Care',
          'Hospitality',
          'Human Resources',
          'Import and Export',
          'Individual & Family Services',
          'Industrial Automation',
          'Information Services',
          'Information Technology and Services',
          'Insurance',
          'International Affairs',
          'International Trade and Development',
          'Internet',
          'Investment Banking',
          'Investment Management',
          'Judiciary',
          'Law Enforcement',
          'Law Practice',
          'Legal Services',
          'Legislative Office',
          'Leisure',
          'Travel & Tourism',
          'Libraries',
          'Logistics and Supply Chain',
          'Luxury Goods & Jewelry',
          'Machinery',
          'Management Consulting',
          'Maritime',
          'Market Research',
          'Marketing and Advertising',
          'Mechanical or Industrial Engineering',
          'Media Production',
          'Medical Devices',
          'Medical Practice',
          'Mental Health Care',
          'Military',
          'Mining & Metals',
          'Mobile Games',
          'Motion Pictures and Film',
          'Museums and Institutions',
          'Music',
          'Nanotechnology',
          'Newspapers',
          'Non-Profit Organization Management',
          'Oil & Energy',
          'Online Media',
          'Outsourcing/Offshoring',
          'Package/Freight Delivery',
          'Packaging and Containers',
          'Paper & Forest Products',
          'Performing Arts',
          'Pharmaceuticals',
          'Philanthropy',
          'Photography',
          'Plastics',
          'Political Organization',
          'Primary/Secondary Education',
          'Printing',
          'Professional Training & Coaching',
          'Program Development',
          'Public Policy',
          'Public Relations and Communications',
          'Public Safety',
          'Publishing',
          'Railroad Manufacture',
          'Ranching',
          'Real Estate',
          'Recreational Facilities and Services',
          'Religious Institutions',
          'Renewables & Environment',
          'Research',
          'Restaurants',
          'Retail',
          'Security and Investigations',
          'Semiconductors',
          'Shipbuilding',
          'Sporting Goods',
          'Sports',
          'Staffing and Recruiting',
          'Supermarkets',
          'Telecommunications',
          'Textiles',
          'Think Tanks',
          'Tobacco',
          'Translation and Localization',
          'Transportation/Trucking/Railroad',
          'Utilities',
          'Venture Capital & Private Equity',
          'Veterinary',
          'Warehousing',
          'Wholesale',
          'Wine and Spirits',
          'Wireless',
          'Writing and Editing',
        ],
      },
      employee: {
        type: String,
        required: true,
        enum: ['< 20', '21-100', '101-250', '250+'],
      },
      thirdParties: {
        type: String,
        required: true,
        enum: ['<5', '5-20', '20+'],
      },
      location: {
        type: Number,
        required: true,
        min: 1,
      },
      regulatoryCompliance: [
        {
          type: String,
        },
      ],
      technologyStack: {
        type: String,
        required: true,
        enum: [
          'On-Premise IT',
          'Cloud',
          'Development',
          'ICS/OT',
        ],
      },
      outsourcedIT: {
        type: Boolean,
        default: false,
      },
      outsourcedSecurityOperations: {
        type: Boolean,
        default: false,
      },
      pastIncidents: {
        type: String,
        minlength: 0,
        maxlength: 2000,
      },
      cspSecurityPolicies: {
        type: Boolean,
        default: false,
      },
      cspListITAssets: {
        type: Boolean,
        default: false,
      },
      cspJobRoleInfoSecTraining: {
        type: Boolean,
        default: false,
      },
      cspIncidentMgmtPlan: {
        type: Boolean,
        default: false,
      },
      cspIncidentVendorNotification: {
        type: Boolean,
        default: false,
      },
      cspCyberInsurance: {
        type: Boolean,
        default: false,
      },
      cspLatestCyberAwarenessThreats: {
        type: Boolean,
        default: false,
      },
      cspMFAUtilized: {
        type: Boolean,
        default: false,
      },
      cspSecurityTesting: {
        type: Boolean,
        default: false,
      },
      cspBackupStrategy: {
        type: Boolean,
        default: false,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  OrganizationProfileSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  OrganizationProfileSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  OrganizationProfileSchema.set('toJSON', {
    getters: true,
  });

  OrganizationProfileSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'organizationProfile',
    OrganizationProfileSchema,
  );
};