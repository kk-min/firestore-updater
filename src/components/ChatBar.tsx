import { serverTimestamp, collection, addDoc } from 'firebase/firestore';

export interface PropTypes {
	docRef: any;
}

const createChatHistory = async (
	docRef: any,
	timestamp: any,
	sender: string,
	msg: string
) => {
	/* create new chat history document to store chat msg */
	/* 1 msg per document */
	const cRef = collection(docRef, 'ChatHistory');
	await addDoc(cRef, {
		from: sender,
		timestamp: timestamp,
		msg: msg,
	});
};

export default function ChatBar(props: PropTypes) {
	const sendHandler = () => {
		createChatHistory(props.docRef, serverTimestamp(), 'Doctor', 'Hello');
	};
	return (
		<div className='chatBarContainer'>
			<input type='text' placeholder='' />
			<button>Send</button>
		</div>
	);
}
