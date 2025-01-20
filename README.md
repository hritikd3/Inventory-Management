# Home Inventory App

A modern, responsive web application for managing home inventory during relocation. This application allows users to catalog their belongings room by room or by categories, making it easier to track items during moving.

## Technologies Used

- **Frontend Framework**: React 18.3.1 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting**: ESLint

## Features

1. **Dual View Modes**
   - Room-wise inventory management
   - Category-wise inventory organization

2. **Room Management**
   - Add/remove rooms
   - Customize room counts
   - Track items per room

3. **Inventory Management**
   - Add/remove items with quantity control
   - Maximum limit of 20 items per type
   - Item categorization
   - Search functionality

4. **User Interface**
   - Responsive design
   - Intuitive navigation with back button
   - Bottom drawer for quick inventory overview
   - Confirmation dialogs for item removal
   - Alert system for inventory limits

5. **Data Organization**
   - Category-based filtering
   - Search functionality
   - Visual item representation with images

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd Inventory-Management
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/         # React components
├── store/             # Redux store and slices
├── types/             # TypeScript type definitions
├── data/             # Mock data and constants
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Future Scope

1. **Authentication & User Management**
   - User accounts
   - Multiple inventory lists per user
   - Sharing capabilities

2. **Enhanced Item Management**
   - Barcode scanning
   - Image upload
   - Item value tracking
   - Item condition notes
   - Item dimensions

3. **Data Management**
   - Cloud synchronization
   - Export/Import functionality
   - Backup options
   - Move history

4. **Advanced Features**
   - Moving cost estimation
   - Packing suggestions
   - Item grouping
   - Labels generation
   - Moving checklist

5. **Integration Possibilities**
   - Moving company services
   - Insurance providers
   - Storage facilities
   - Packing supplies ordering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

