import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Professional } from '@voice-nestjs/types'
import { SEARCH_PROFESSIONALS } from '../../utils/graphql-fetch'
import { normalizeQuery } from '../../utils/normalizeQuery'
import './form.css'

interface SearchResponse {
  searchProfessionals: Professional[]
}

const VoiceSearchForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isListening, setIsListening] = useState<boolean>(false)

  const { data, loading } = useQuery<SearchResponse>(SEARCH_PROFESSIONALS, {
    variables: { keyword: searchQuery },
    skip: !searchQuery,
    onCompleted: (data) => {
      if (data?.searchProfessionals?.length > 0) {
        setInputValue('')
      }
    },
  })

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check for Command/Ctrl + Shift + A for voice
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        if (!isListening) {
          startListening()
        }
      }
      // Check for Command/Ctrl + Shift + F for search
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [inputValue, isListening])

  const handleClear = () => {
    setInputValue('')
    setSearchQuery('')
    setError('')
  }

  const handleTryAgain = () => {
    setInputValue('')
    setSearchQuery('')
    setError('')
    document.querySelector<HTMLInputElement>('.search-input')?.focus()
  }

  // Voice recognition setup
  const startListening = () => {
    setIsListening(true)
    setInputValue('')

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      // setInputValue((prev) => prev + ' ' + transcript)
      setInputValue(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    // Start listening
    try {
      recognition.start()
    } catch (err) {
      console.error('Speech recognition failed to start:', err)
      setIsListening(false)
    }
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const normalizedKeywords = normalizeQuery(inputValue)

    if (normalizedKeywords.length === 0) {
      setError('Please enter a valid search query.')
      return
    }

    setError('')
    const searchString = normalizedKeywords.join(' ')
    setSearchQuery(searchString)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="main-container">
      {data?.searchProfessionals && data.searchProfessionals.length > 0 && (
        <button onClick={handleClear} className="clear-button">
          Clear Results
        </button>
      )}
      <div className="results-container">
        {!data?.searchProfessionals ? (
          <div className="welcome-container">
            <h1 className="welcome-title">Welcome</h1>
            <p className="welcome-text">Search some professionals or doctors</p>
            <div className="shortcuts-info">
              <p>Shortcuts:</p>
              <p>
                <kbd>{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}</kbd> +{' '}
                <kbd>Shift</kbd> + <kbd>A</kbd> for voice search
              </p>
              <p>
                <kbd>{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}</kbd> +{' '}
                <kbd>Shift</kbd> + <kbd>F</kbd> to search
              </p>
            </div>
          </div>
        ) : data.searchProfessionals.length > 0 ? (
          <div className="results">
            {data.searchProfessionals.map((prof) => (
              <div key={prof.id} className="result-card">
                <h3>{prof.name}</h3>
                <div className="details">
                  <p>
                    <strong>Category:</strong> {prof.category}
                  </p>
                  <p>
                    <strong>Rating:</strong> {prof.rating} ⭐
                  </p>
                  <p>
                    <strong>Specialties:</strong> {prof.subCategory.join(', ')}
                  </p>
                  <p>
                    <strong>Locations:</strong> {prof.zone.join(', ')}
                  </p>
                  <p>
                    <strong>Total Appointments:</strong> {prof.totalAppointment}
                  </p>
                  <p>
                    <strong>Practice Area:</strong> {prof.areaOfPractice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results-container">
            <p className="no-results-text">No results found</p>
            <button onClick={handleTryAgain} className="try-again-button">
              Try Another Search
            </button>
          </div>
        )}
      </div>

      <div className="search-container">
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search professionals..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={`voice-button ${isListening ? 'listening' : ''}`}
            onClick={startListening}
            disabled={isListening}
          >
            {isListening ? '🔴' : '🎤'}
          </button>
          <button type="submit" className="send-button" disabled={loading}>
            {loading ? '⏳' : '➤'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  )
}

export default VoiceSearchForm
