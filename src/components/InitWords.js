import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Words.css";

const InitWords = () => {
    const [initialWords, setInitialWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [wordData, setWordData] = useState([]);
    const [isWordAvailable, setIsWordAvailable] = useState(true);
    const [score, setScore] = useState({ greens: 0, reds: 0 });
    const [showButtons, setShowButtons] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [atLastWord, setAtLastWord] = useState(false);

    useEffect(() => {
        const fetchInitialWords = async () => {
            try {
                const response = await axios.get("https://z6o1ltqubi.execute-api.eu-north-1.amazonaws.com/default/api/getinitwords");
                setInitialWords(response.data.body);
            } catch (error) {
                console.error('Error fetching initial words:', error);
            }
        };
        fetchInitialWords();
    }, []);

    useEffect(() => {
        if (initialWords.length > 0) {
            setCurrentWord(initialWords[currentIndex].word);
        }
    }, [initialWords, currentIndex]);

    const fetchWordData = async () => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`);
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
        }
    };

    const isNoDefinitionsFound = (data) => {
        return (
            data &&
            data.title === "No Definitions Found" &&
            data.message === "Sorry pal, we couldn't find definitions for the word you were looking for."
        );
    };

    const handleNextWord = () => {
        setCurrentIndex((prevIndex) => (prevIndex < initialWords.length - 1 ? prevIndex + 1 : prevIndex));
        setShowDetails(false);
        setShowButtons(false);
        setShowResults(false);
    };

    const handleSwitch = () => {
        setShowDetails(true);
        fetchWordData();
        setShowButtons(true);
    };

    const handleKnowWord = () => {
        setScore((prevScore) => ({ ...prevScore, greens: prevScore.greens + 1 }));
        if (currentIndex === initialWords.length - 1) {
            setAtLastWord(true);
        }
        setWordData([]);
        handleNextWord();
    };

    const handleDontKnowWord = () => {
        setScore((prevScore) => ({ ...prevScore, reds: prevScore.reds + 1 }));
        if (currentIndex === initialWords.length - 1) {
            setAtLastWord(true);
        }
        setWordData([]);
        handleNextWord();
    };

    const handleViewResults = () => {
        setShowResults(true);
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5">INITIAL WORDS</h2>
            {!(currentIndex === initialWords.length - 1 && atLastWord) && (
                <div>
                    <div className="card-deck d-flex justify-content-center">
                        <div className="card square-card">
                            <div
                                className={`card-body d-flex align-items-center justify-content-center`}
                                style={{ backgroundColor: "lightBlue", display: "flex", flexDirection: "column" }}
                            >
                                {!showDetails ? (
                                    <h5 className="card-title text-center text-uppercase">
                                        {currentWord}
                                    </h5>
                                ) : (
                                    <>
                                        {wordData.map((meaning, index) => (
                                            <div key={index} style={{ display: "flex", flexDirection: "column" }}>
                                                <strong>{meaning.partOfSpeech}:</strong>{" "}
                                                {meaning.definition}
                                                <br />
                                                {meaning.example && (
                                                    <span>Example: {meaning.example}</span>
                                                )}
                                                <hr />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="card-footer d-flex justify-content-center">
                                {!showDetails && (
                                    <button className="btn btn-success mx-2" onClick={handleSwitch}>
                                        Switch
                                    </button>
                                )}
                                {showButtons && (
                                    <div className="card-buttons">
                                        <button className="btn btn-success mx-2"
                                            onClick={handleKnowWord}> Knew this word! </button>
                                        <button className="btn btn-danger mx-2"
                                            onClick={handleDontKnowWord}> Don't know </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="progress-bars">
                        <div className="progress">
                            <div className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${(score.greens / initialWords.length) * 100}%` }}
                                aria-valuenow={(score.greens / initialWords.length) * 100}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                        <div className="progress mt-2">
                            <div className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: `${(score.reds / initialWords.length) * 100}%` }}
                                aria-valuenow={(score.reds / initialWords.length) * 100}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>
                </div>
            )}
            {(currentIndex === initialWords.length - 1 && atLastWord) && (
                <div className="text-center mt-3">
                    <h4>Test completed!</h4>
                    <p>Known words: {score.greens}</p>
                    <p>Unknown words: {score.reds}</p>
                    <p>Total words: {score.reds + score.greens}</p>
                </div>
            )}
            {!isWordAvailable && !showResults && (
                <div className="notification">Word not available!</div>
            )}
        </div>
    );
};

export default InitWords;
