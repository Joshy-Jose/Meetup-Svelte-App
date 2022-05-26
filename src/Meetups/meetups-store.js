import { writable } from "svelte/store";

 const meetups = writable([]);
// customMeetupsStore is a js object,
const customMeetupsStore = {
    subscribe: meetups.subscribe,  //subscribe method pointed to meetups.
    setMeetups:(meetupArray) => {
        meetups.set(meetupArray);   //overwrite all existing data
    },
    addMeetup: (meetupData) => {   //this properties we turn into methods by assigning function as values for thes methods
        const newMeetup = {
            ...meetupData,
        };
        meetups.update(items => {
            return [newMeetup,...items]
        })
    },     
    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = {...items[meetupIndex], ...meetupData};
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })

    },    
    deleteMeetup: (id) => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        })
    },
    toggleFavorite: id => {
        meetups.update(items => {
         const updatedMeetup = { ...items.find(m => m.id === id) };
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
        const meetupIndex = items.findIndex(m => m.id === id);
        const updatedMeetups = [...items];
        updatedMeetups[meetupIndex] = updatedMeetup;
        return updatedMeetups;
        })
    }


}


export default customMeetupsStore;