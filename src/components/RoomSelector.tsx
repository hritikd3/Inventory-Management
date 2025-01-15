import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { updateRoomCount } from '../store/inventorySlice';
import { Minus, Plus } from 'lucide-react';

const RoomSelector = () => {
  const rooms = useSelector((state: RootState) => state.inventory.rooms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCountChange = (roomId: string, increment: boolean) => {
    dispatch(updateRoomCount({ roomId, increment }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex-1 p-4">
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between">
              <span className="text-lg">{room.name}</span>
              <div className="flex items-center space-x-4">
                <button 
                  className="p-1"
                  onClick={() => handleCountChange(room.id, false)}
                  disabled={room.count <= 0}
                >
                  <Minus className={`w-6 h-6 ${room.count <= 0 ? 'text-gray-300' : 'text-blue-500'}`} />
                </button>
                <span className="text-lg">{room.count}</span>
                <button 
                  className="p-1"
                  onClick={() => handleCountChange(room.id, true)}
                >
                  <Plus className="w-6 h-6 text-blue-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <button 
          className="w-full bg-blue-500 text-white py-3 rounded-lg"
          onClick={() => navigate('/inventory')}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoomSelector;