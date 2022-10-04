import React, { useState } from 'react';

export interface propTypes {
    path: string;
    setPath: React.Dispatch<React.SetStateAction<string>>;
}

export default function PathDisplay(props: propTypes) {
    const [showPathChange, setShowPathChange] = useState(false);
    const [inputPath, setinputPath] = useState('');

    const changeHandler = () => {
        setShowPathChange((prev) => !prev);
    };

    const confirmHandler = () => {
        props.setPath(inputPath);
        setShowPathChange((prev) => !prev);
    };

    return (
        <div>
            <p className='pathDisplay'>Consultation Path: {props.path}</p>
            <button className='changeButton' onClick={changeHandler}>
                Change Path
            </button>
            {showPathChange ? (
                <div>
                    <input
                        className='pathInput'
                        type='text'
                        placeholder={'Enter new path'}
                        onChange={(e) => setinputPath(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                confirmHandler();
                            }
                        }}
                    />
                    <button className='confirmButton' onClick={confirmHandler}>
                        Confirm
                    </button>
                </div>
            ) : null}
        </div>
    );
}