import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room, InventoryItem } from '../types';

interface InventoryState {
  rooms: Room[];
  selectedItems: InventoryItem[];
}

const initialState: InventoryState = {
  rooms: [
    {
      id: '1',
      name: 'Living Room',
      type: 'living',
      count: 0,
      items: [],
    },
    {
      id: '2',
      name: 'Kitchen',
      type: 'kitchen',
      count: 0,
      items: [],
    },
    {
      id: '3',
      name: 'Bedroom',
      type: 'bedroom',
      count: 0,
      items: [],
    },
    {
      id: '4',
      name: 'Balcony',
      type: 'balcony',
      count: 0,
      items: [],
    },
  ],
  selectedItems: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateRoomCount: (
      state,
      action: PayloadAction<{ roomId: string; increment: boolean }>
    ) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) {
        if (action.payload.increment) {
          room.count += 1;
        } else if (room.count > 0) {
          room.count -= 1;
        }
      }
    },
    addItem: (state, action: PayloadAction<{ roomId: string; item: InventoryItem }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) {
        const existingItem = room.items.find(i => i.id === action.payload.item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          room.items.push({ ...action.payload.item, quantity: 1 });
        }
      }
    },
    removeItem: (state, action: PayloadAction<{ roomId: string; itemId: string }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) {
        const item = room.items.find(i => i.id === action.payload.itemId);
        if (item && item.quantity > 0) {
          item.quantity -= 1;
          if (item.quantity === 0) {
            room.items = room.items.filter(i => i.id !== action.payload.itemId);
          }
        }
      }
    },
  },
});

export const { updateRoomCount, addItem, removeItem } = inventorySlice.actions;
export default inventorySlice.reducer;