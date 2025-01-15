import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { addItem, removeItem } from '../store/inventorySlice';
import { Search, Minus, Plus, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';
import { mockInventoryItems, categories } from '../data/mockData';

interface RemovalConfirmation {
  show: boolean;
  roomId: string;
  itemId: string;
}

interface LimitAlert {
  show: boolean;
  itemName: string;
}

const MAX_QUANTITY = 20;

const InventoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedRooms, setExpandedRooms] = useState<string[]>([]);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [showDrawer, setShowDrawer] = useState(false);
  const [limitAlert, setLimitAlert] = useState<LimitAlert>({
    show: false,
    itemName: '',
  });
  const [removalConfirmation, setRemovalConfirmation] = useState<RemovalConfirmation>({
    show: false,
    roomId: '',
    itemId: '',
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.inventory.rooms.filter(room => room.count > 0));

  // Calculate total items across all rooms
  const allAddedItems = rooms.reduce((acc, room) => {
    room.items.forEach(item => {
      const existingItem = acc.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
    });
    return acc;
  }, [] as Array<{ id: string; name: string; quantity: number; image: string; }>);

  const toggleRoom = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleSearch = (roomId: string, query: string) => {
    setSearchQueries(prev => ({
      ...prev,
      [roomId]: query
    }));
  };

  const handleQuantityChange = (roomId: string, itemId: string, increment: boolean) => {
    const room = rooms.find(r => r.id === roomId);
    const item = room?.items.find(i => i.id === itemId);
    const totalQuantity = allAddedItems.find(i => i.id === itemId)?.quantity || 0;
    
    if (increment) {
      if (totalQuantity >= MAX_QUANTITY) {
        const itemName = mockInventoryItems.find(i => i.id === itemId)?.name || '';
        setLimitAlert({
          show: true,
          itemName,
        });
        return;
      }
      dispatch(addItem({ roomId, item: mockInventoryItems.find(i => i.id === itemId)! }));
    } else if (item?.quantity === 1) {
      setRemovalConfirmation({
        show: true,
        roomId,
        itemId,
      });
    } else {
      dispatch(removeItem({ roomId, itemId }));
    }
  };

  const handleRemovalConfirm = () => {
    const { roomId, itemId } = removalConfirmation;
    dispatch(removeItem({ roomId, itemId }));
    setRemovalConfirmation({ show: false, roomId: '', itemId: '' });
  };

  const handleRemovalCancel = () => {
    setRemovalConfirmation({ show: false, roomId: '', itemId: '' });
  };

  const getFilteredItems = (roomId: string) => {
    const searchQuery = searchQueries[roomId] || '';
    return mockInventoryItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {removalConfirmation.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-500" />
              <p className="text-lg font-medium">
                Are you sure you want to remove this item from Inventory?
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 text-blue-500"
                onClick={handleRemovalCancel}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleRemovalConfirm}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {limitAlert.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <p className="text-lg font-medium">
                Inventory Limit Reached
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              You cannot add more than {MAX_QUANTITY} units of {limitAlert.itemName}.
            </p>
            <div className="flex justify-end">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setLimitAlert({ show: false, itemName: '' })}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the component remains the same */}
      {/* ... */}
      
      {/* Bottom Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 flex justify-center transform ${
          showDrawer ? 'translate-y-0' : 'translate-y-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="w-full max-w-md bg-white rounded-t-xl shadow-lg max-h-[80vh] overflow-y-auto">
          <div 
            className="flex justify-center p-2 cursor-pointer"
            onClick={() => setShowDrawer(!showDrawer)}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="px-4 pb-6">
            <h2 className="text-xl font-semibold mb-4">Added Items</h2>
            <div className="space-y-4">
              {allAddedItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-lg">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {rooms.map((room, index) => {
            const isExpanded = expandedRooms.includes(room.id);
            const itemsAdded = room.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div key={room.id} className="bg-gray-50 rounded-lg overflow-hidden">
                <button
                  className="w-full px-4 py-3 flex items-center justify-between bg-white"
                  onClick={() => toggleRoom(room.id)}
                >
                  <div>
                    <span className="text-lg font-medium">Room {index + 1}</span>
                    {itemsAdded > 0 && (
                      <span className="ml-2 text-sm text-blue-500">
                        Item Added {itemsAdded}
                      </span>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </button>

                {isExpanded && (
                  <div className="p-4">
                    <div className="relative mb-6">
                      <input
                        type="text"
                        placeholder="Search for items"
                        className="w-full py-2 pl-10 pr-4 border rounded-lg"
                        value={searchQueries[room.id] || ''}
                        onChange={(e) => handleSearch(room.id, e.target.value)}
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>

                    <div className="flex space-x-4 overflow-x-auto mb-6 pb-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                            selectedCategory === category.name
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          {category.name} {category.count}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {getFilteredItems(room.id).map((item) => {
                        const roomItem = room.items.find(i => i.id === item.id);
                        const quantity = roomItem?.quantity || 0;

                        return (
                          <div key={item.id} className="bg-white rounded-lg shadow">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="p-3">
                              <h3 className="font-medium mb-2">{item.name}</h3>
                              {quantity === 0 ? (
                                <button
                                  className="w-full text-blue-500 py-1 px-3 rounded"
                                  onClick={() => handleQuantityChange(room.id, item.id, true)}
                                >
                                  Add
                                </button>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <button onClick={() => handleQuantityChange(room.id, item.id, false)}>
                                    <Minus className="w-5 h-5 text-blue-500" />
                                  </button>
                                  <span>{quantity}</span>
                                  <button onClick={() => handleQuantityChange(room.id, item.id, true)}>
                                    <Plus className="w-5 h-5 text-blue-500" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 flex justify-center">
        <div className="w-full max-w-md p-4 border-t bg-white">
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
            <p className="text-sm">
              Please ensure all inventory is added upfront. Any items added later during pickup will incur extra charges.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              className="flex-1 bg-gray-100 text-blue-500 py-3 rounded-lg font-medium"
              onClick={() => setShowDrawer(true)}
            >
              View {allAddedItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </button>
            <button 
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium"
              onClick={() => navigate('/')}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;