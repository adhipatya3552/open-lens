# OpenLens - Project Rules & Documentation

## 🎯 Project Overview

**OpenLens** is an Indian open media sharing platform for photos and videos that revolutionizes how creators share their work and how users discover and use visual content. Built with modern web technologies and designed for the creator economy, OpenLens combines the simplicity of platforms like Unsplash and Pexels with advanced licensing options, creator rewards, and AI-powered features.

### Mission Statement
*"To democratize visual content creation and distribution while ensuring fair compensation and proper attribution for creators worldwide."*

### Tagline
*"Open media, endless possibilities."*

---

## 🎨 Core Features

### Phase 1 Features (MVP)
- **User Authentication** - Secure signup/login with email and social providers
- **Media Upload System** - Drag-and-drop upload with metadata management
- **Advanced Search** - Full-text search with filters (type, license, orientation, resolution)
- **Media Gallery** - Responsive masonry grid with infinite scroll
- **License Management** - CC0, CC BY, and custom licensing options
- **User Profiles** - Creator portfolios with statistics and uploaded content
- **Download System** - Multiple resolution downloads with tracking
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### Phase 2 Features (Advanced)
- **Collections System** - User-created themed collections
- **Favorites** - Personal media bookmarking
- **Multi-License Mode** - Multiple licensing options per media item
- **Creator Analytics** - Detailed performance metrics and insights
- **Badge System** - Verified creators, top contributors, achievement badges
- **Attribution Tools** - Automatic attribution code generation

### Phase 3 Features (Unique Differentiators)
- **License Builder** - Interactive custom license creation tool
- **Creator Reward Pool** - Monthly earnings distribution based on performance
- **MicroLicense Market** - Paid licensing starting from $1
- **Co-Create Collections** - Collaborative collections with revenue sharing
- **Release Guard** - Model and property release verification
- **Use-Case Search** - Search by intended usage (hero banners, social posts, etc.)
- **Visual Storyboard** - Media sequencing and campaign planning
- **Palette & Mood Search** - Color-based and emotion-based discovery
- **Smart Derivatives** - AI-powered editing and variations

---

## 🛠 Technology Stack

### Core Technologies
- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS (utility-first approach)
- **Backend**: Supabase (PostgreSQL, Authentication, Storage, API)
- **Typography**: Inter font family exclusively
- **State Management**: React Context API + custom hooks
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: Framer Motion + CSS transitions

### Supporting Technologies
- **File Upload**: React Dropzone
- **Forms**: React Hook Form + Yup validation
- **Image Processing**: Browser-native APIs + Canvas manipulation
- **Search**: PostgreSQL full-text search with GIN indexes
- **Storage**: Supabase Storage with CDN
- **Authentication**: Supabase Auth (email, Google, GitHub)
- **Real-time**: Supabase real-time subscriptions

### Future Integrations
- **AI Services**: OpenAI API for tagging and analysis
- **Payment Processing**: Stripe for microlicense transactions
- **CDN**: Cloudflare for global content delivery
- **Analytics**: PostHog for user behavior tracking
- **Monitoring**: Sentry for error tracking
- **Email**: Resend for transactional emails

---

## 🏗 Architecture & Design Principles

### Design Philosophy
- **Creator-Centric**: Every decision prioritizes creator value and user experience
- **Open by Default**: Embrace open-source principles and Creative Commons licensing
- **Performance First**: Fast loading times and smooth interactions
- **Mobile-First**: Responsive design optimized for all screen sizes
- **Accessibility**: WCAG 2.1 compliant with proper semantic HTML

### Visual Design System
- **Color Palette**: Vibrant gradients (purple-to-blue, teal-to-purple, pink-to-orange)
- **Typography**: Inter font with proper hierarchy (headings, body, captions)
- **Spacing**: Consistent 8px grid system with generous whitespace
- **Components**: Reusable design system with variants and states
- **Animations**: Subtle micro-interactions enhancing user experience
- **Layout**: Clean, modern interfaces with focus on content

### Technical Architecture
- **Component-Based**: Reusable React components with clear responsibilities
- **Type Safety**: Full TypeScript implementation with strict mode
- **Performance**: Code splitting, lazy loading, and optimized rendering
- **Security**: Row Level Security (RLS) policies and input validation
- **Scalability**: Database design supporting millions of media items
- **Real-time**: Live updates for downloads, likes, and user activity

---

## 📊 Database Schema

### Core Tables
```sql
-- User profiles and authentication
profiles (id, email, username, full_name, avatar_url, bio, is_creator, created_at)

-- Media content
media (id, user_id, title, description, file_url, thumbnail_url, file_type, 
       license_id, tags, status, downloads, views, likes, created_at)

-- License types and terms
license_types (id, name, code, description, requires_attribution, 
               allows_commercial, allows_derivatives, price)

-- User collections
collections (id, user_id, name, description, is_public, created_at)
collection_items (collection_id, media_id, added_at)

-- User favorites
favorites (user_id, media_id, created_at)

-- Download tracking
downloads (id, media_id, user_id, download_size, ip_address, created_at)

-- Analytics and engagement
media_analytics (media_id, event_type, user_id, metadata, created_at)
```

### Advanced Tables (Phase 2-3)
```sql
-- Multi-licensing support
media_licenses (media_id, license_id, price, created_at)

-- Creator badges and achievements
badges (id, name, description, criteria, icon_url)
user_badges (user_id, badge_id, earned_at)

-- Revenue and monetization
revenue (user_id, media_id, amount, source, status, created_at)
license_purchases (buyer_id, media_id, license_id, amount, created_at)

-- Collaborative features
collection_collaborators (collection_id, user_id, role, permissions)
```

---

## 🗓 Development Roadmap

### Phase 1: MVP Foundation (Months 1-4)
**Goal**: Launch functional platform with core features

#### Month 1: Setup & Authentication
- [ ] Project initialization and development environment
- [ ] Supabase integration and database schema
- [ ] User authentication system (email, social login)
- [ ] Basic user profiles and onboarding

#### Month 2: Media Management
- [ ] File upload system with drag-and-drop
- [ ] Media storage and thumbnail generation
- [ ] Basic metadata management (title, description, tags)
- [ ] License selection interface

#### Month 3: Discovery & Interaction
- [ ] Media gallery with responsive grid layout
- [ ] Search functionality with filters
- [ ] Media detail pages with download options
- [ ] Basic user analytics and tracking

#### Month 4: Polish & Launch
- [ ] User profile dashboards
- [ ] Performance optimization
- [ ] Testing and bug fixes
- [ ] MVP launch preparation

### Phase 2: Advanced Features (Months 5-8)
**Goal**: Enhance user experience with advanced functionality

#### Month 5: Collections & Organization
- [ ] User collections system
- [ ] Favorites and bookmarking
- [ ] Collection sharing and collaboration
- [ ] Enhanced search with saved searches

#### Month 6: Creator Tools
- [ ] Multi-license mode implementation
- [ ] Creator analytics dashboard
- [ ] Badge system and achievements
- [ ] Creator verification process

#### Month 7: Licensing Innovation
- [ ] Interactive license builder
- [ ] Custom license templates
- [ ] License comparison tools
- [ ] Attribution code generator

#### Month 8: Community Features
- [ ] User following system
- [ ] Creator showcases
- [ ] Community guidelines and moderation
- [ ] User feedback and rating system

### Phase 3: Unique Differentiators (Months 9-12)
**Goal**: Implement innovative features that set OpenLens apart

#### Month 9: Monetization
- [ ] Creator reward pool implementation
- [ ] MicroLicense marketplace
- [ ] Payment processing integration
- [ ] Revenue sharing system

#### Month 10: AI-Powered Features
- [ ] Automatic tagging and categorization
- [ ] Palette and mood-based search
- [ ] Smart content recommendations
- [ ] AI-assisted editing tools

#### Month 11: Advanced Tools
- [ ] Visual storyboard builder
- [ ] Use-case specific search
- [ ] Release Guard verification
- [ ] Smart derivatives generation

#### Month 12: Scale & Optimize
- [ ] Performance optimization for scale
- [ ] Advanced analytics and insights
- [ ] API for third-party integrations
- [ ] Mobile app development planning

---

## 👥 Target Users

### Primary Users: Creators
- **Photographers**: Professional and amateur photographers seeking visibility
- **Videographers**: Content creators and filmmakers
- **Graphic Designers**: Digital artists and visual designers
- **Agencies**: Creative agencies building stock libraries
- **Students**: Learning creators building portfolios

### Secondary Users: Content Consumers
- **Marketers**: Social media managers and digital marketers
- **Designers**: Web and graphic designers seeking assets
- **Educators**: Teachers and course creators
- **Bloggers**: Content creators needing visuals
- **Small Businesses**: Local businesses needing marketing materials

### Use Cases
- **Free Stock Media**: High-quality photos and videos for projects
- **Commercial Licensing**: Paid usage rights for business applications
- **Portfolio Building**: Creator showcase and networking
- **Inspiration**: Discovering trends and creative ideas
- **Collaboration**: Team projects and shared collections

---

## 🎯 Success Metrics

### User Growth Metrics
- Monthly Active Users (MAU)
- Creator signup and retention rates
- Media upload volume and frequency
- User engagement and session duration

### Content Metrics
- Total media library size
- Download volume and conversion rates
- Search success rates and user satisfaction
- License adoption and usage patterns

### Revenue Metrics
- MicroLicense transaction volume
- Creator reward pool distribution
- Premium subscription conversions
- API usage and third-party integrations

### Quality Metrics
- Content moderation efficiency
- User-reported issues and resolution time
- Platform performance and uptime
- Accessibility compliance scores

---

## 🔒 Security & Compliance

### Data Protection
- **GDPR Compliance**: EU data protection regulations
- **Privacy Policy**: Clear data usage and retention policies
- **User Consent**: Explicit consent for data processing
- **Data Encryption**: At-rest and in-transit encryption

### Content Security
- **DMCA Process**: Copyright infringement handling
- **Content Moderation**: AI and human review systems
- **User Reporting**: Community-driven content flagging
- **Legal Framework**: Terms of service and usage policies

### Technical Security
- **Authentication**: Secure JWT-based session management
- **Authorization**: Row Level Security (RLS) policies
- **Input Validation**: SQL injection and XSS protection
- **Rate Limiting**: API abuse prevention

---

## 🚀 Development Workflow

### Code Standards
- **TypeScript**: Strict mode with comprehensive type definitions
- **ESLint/Prettier**: Consistent code formatting and linting
- **Testing**: Jest and React Testing Library for component testing
- **Documentation**: JSDoc comments for complex functions

### Git Workflow
- **Branching**: Feature branches with descriptive names
- **Commits**: Conventional commit messages
- **Pull Requests**: Code review requirement for main branch
- **CI/CD**: Automated testing and deployment pipelines

### Deployment Strategy
- **Staging Environment**: Pre-production testing environment
- **Feature Flags**: Gradual rollout of new features
- **Monitoring**: Real-time error tracking and performance monitoring
- **Rollback Plan**: Quick rollback procedures for critical issues

---

## 🎨 Brand Identity

### Visual Identity
- **Logo**: Clean, modern wordmark with media-inspired iconography
- **Color Scheme**: Purple and blue gradients with accent colors
- **Typography**: Inter font family for all text elements
- **Photography Style**: High-quality, diverse, authentic imagery

### Brand Voice
- **Tone**: Professional yet approachable, inspiring creativity
- **Messaging**: Empowering creators, democratizing access to media
- **Values**: Openness, fairness, creativity, community, quality

### Marketing Strategy
- **Content Marketing**: Creator spotlights and tutorials
- **Community Building**: Social media engagement and events
- **Partnerships**: Collaborations with design tools and platforms
- **SEO Strategy**: Optimized content discovery and search rankings

---

## 📞 Support & Community

### User Support
- **Help Center**: Comprehensive documentation and FAQs
- **Contact Options**: Email support and community forums
- **Creator Resources**: Guides for maximizing platform benefits
- **API Documentation**: Developer resources for integrations

### Community Guidelines
- **Content Standards**: Quality and appropriateness requirements
- **Attribution Rules**: Proper crediting and usage guidelines
- **Behavior Policies**: Respectful community interaction standards
- **Moderation Process**: Fair and transparent content review

---

## 🔄 Maintenance & Updates

### Regular Updates
- **Security Patches**: Monthly security updates and vulnerability fixes
- **Feature Releases**: Quarterly major feature deployments
- **Performance Optimization**: Ongoing speed and efficiency improvements
- **Bug Fixes**: Weekly minor bug fixes and improvements

### Feedback Integration
- **User Feedback**: Regular surveys and feedback collection
- **Creator Input**: Direct communication with top contributors
- **Community Requests**: Feature requests from user community
- **Analytics-Driven**: Data-informed product decisions

---

## 📈 Future Vision

### 5-Year Goals
- **Global Platform**: Millions of creators and users worldwide
- **AI Integration**: Advanced AI-powered creative tools
- **Mobile Apps**: Native iOS and Android applications
- **Enterprise Solutions**: B2B offerings for large organizations
- **Creator Economy**: Sustainable income opportunities for creators

### Innovation Areas
- **Virtual Reality**: VR and 360-degree content support
- **Blockchain**: NFT integration and decentralized ownership
- **Machine Learning**: Predictive content recommendations
- **IoT Integration**: Smart device connectivity and automation
- **Sustainability**: Carbon-neutral hosting and operations

---

This document serves as the definitive guide for OpenLens development, outlining project goals, technical requirements, and long-term vision. All development decisions should align with these principles and objectives.