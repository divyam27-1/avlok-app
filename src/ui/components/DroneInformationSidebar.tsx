import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  altitude: number;
  Docked: boolean;
  patrolling: string;
  ROI: string;
}

const DroneInformationSidebar = ({
  isOpen,
  onClose,
  latitude,
  longitude,
  altitude,
  Docked,
  patrolling,
  ROI
}: Props) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-800 text-white transform z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <h2 className="text-xl pt-6 font-bold px-6">Drone Information</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg italic">Latitude</h3>
            <p>{latitude}</p>
          </div>
          <div>
            <h3 className="text-lg italic">Longitude</h3>
            <p>{longitude}</p>
          </div>
          <div>
            <h3 className="text-lg italic">Altitude</h3>
            <p>{altitude}</p>
          </div>
          <div>
            <h3 className="text-lg italic">Docked</h3>
            <p><strong>{Docked}</strong></p>
          </div>
          <div>
            <h3 className="text-lg italic">patrolling</h3>
            <p>{patrolling}</p>
          </div>
          <div>
            <h3 className="text-lg italic"><strong>ROI</strong></h3>
            <p><strong>{ROI}</strong></p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default DroneInformationSidebar;
