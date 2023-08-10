import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const AddWord = () => {
    const [word, setWord] = useState('');
    const [wordData, setWordData] = useState([]);
    const [savedWords, setSavedWords] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isWordAvailable, setIsWordAvailable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storedWords = localStorage.getItem('savedWords');
        if (storedWords) {
            setSavedWords(JSON.parse(storedWords));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('savedWords', JSON.stringify(savedWords));
    }, [savedWords]);

    const fetchWordData = async () => {
        setIsLoading(true);
        try {
            if (!word || word.trim().length === 0) {
                setIsWordAvailable(false);
                setWordData([]);
                return;
            }
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            if (isNoDefinitionsFound(data)) {
                setIsWordAvailable(false);
                setWordData([]);
            } else {
                const meanings = data[0]?.meanings || [];

                const newWordData = meanings.map((meaning) => {
                    const partOfSpeech = meaning.partOfSpeech;
                    const firstDefinition = meaning.definitions[0]?.definition || '';
                    const firstExample = meaning.definitions[0]?.example || '';

                    return {
                        partOfSpeech,
                        definition: firstDefinition,
                        example: firstExample
                    };
                });

                setIsWordAvailable(true);
                setWordData(newWordData);
            }
        } catch (error) {
            console.error('Error fetching word data:', error);
            setIsWordAvailable(true);
            setWordData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const isNoDefinitionsFound = (data) => {
        return (
            data &&
            data.title === "No Definitions Found" &&
            data.message === "Sorry pal, we couldn't find definitions for the word you were looking for."
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsWordAvailable(true);
        fetchWordData();
    };

    const handleSearchNewWord = () => {
        setWord('');
        setWordData([]);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await axios.post('https://z6o1ltqubi.execute-api.eu-north-1.amazonaws.com/default/api/adduserword', { word: word });
            setIsSaving(false);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 1000);
            console.log('Word saved successfully!');
        } catch (error) {
            console.error('Error saving word:', error);
            setIsSaving(false);
        }
    };


    return (
        <div className="container">
            <h1 className="text-center mt-5">Add a Word</h1>
            <form onSubmit={handleFormSubmit} className="mt-5">
                <div className="mb-3">
                    <label htmlFor="wordInput" className="form-label">Enter a word:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="wordInput"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Fetch Word Data</button>
                    {isLoading && <span> Loading...</span>}
                </div>
            </form>
            {wordData.length > 0 && (
                <div>
                    <br />
                    {wordData.map((meaning, index) => (
                        <div key={index}>
                            <strong>{meaning.partOfSpeech}:</strong> {meaning.definition}<br />
                            {meaning.example && <span>Example: {meaning.example}</span>}
                            <hr />
                        </div>
                    ))}
                    <div>
                        <button onClick={handleSave} className="btn btn-primary">Save</button>
                        {isSaving && <span> Saving...</span>}
                    </div>
                    <br />
                    <button onClick={handleSearchNewWord} className="btn btn-primary">Search New Word</button>
                </div>
            )}
            {!isWordAvailable && (
                <div className="notification">Word not available!</div>
            )}
            {showNotification && (
                <div className="notification">Word saved successfully!</div>
            )}
        </div>
    );
};

export default AddWord;