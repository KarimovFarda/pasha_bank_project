import React, { useState } from 'react'
import './newsletterStyle.scss'
import { useParams } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import $ from 'jquery';


declare const window: any;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    
    title: {
      justifyContent: 'end',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
export const Notes = () => {
  let speech: SpeechSynthesisUtterance
  try {
    speech = new SpeechSynthesisUtterance()
  } catch (e) {
    disableButton()
    showUnsupportedMessage()
  }
  function disableButton() {
    const button: any = document.getElementById('speak-btn')
    button.disabled = ''
  }
  function showUnsupportedMessage() {
    const unsupported = document.getElementById('unsupported')
    unsupported?.classList.add('show')
  }
  const params = useParams();
  const id = (Object(params).id)

  const [notesDisplay, setNotesDisplay] = useState("none")

  try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch (e) {
    $('.no-browser-support').show();
    $('.app').hide();
  }
  var noteTextarea = $('#note-textarea');
  var instructions = $('#recording-instructions');
  var notesList = $('ul#notes');
  var noteContent: any = '';
  // Get all notes from previous sessions and display them.
  var notes = getAllNotes();
  renderNotes(notes);
  recognition.continuous = true;
  recognition.onresult = function (event: any) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);
    if (!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
    }
  };
  recognition.onstart = function () {
    instructions.text('Voice recognition activated. Try speaking into the microphone.');
  }
  recognition.onspeechend = function () {
    instructions.text('You were quiet for a while so voice recognition turned itself off.');
  }
  recognition.onerror = function (event: any) {
    if (event.error === 'no-speech') {
      instructions.text('No speech was detected. Try again.');
    };
  }
  const [display, setDisplay] = useState<string>('inline-block')
  $('#start-record-btn').on('click', function (e) {
    if (noteContent.length) {
      noteContent += ' ';
    }
    recognition.start();
  });
  $('#pause-record-btn').on('click', function (e) {
    recognition.stop();
    instructions.text('Voice recognition paused.');
  });
  noteTextarea.on('input', function () {
    noteContent = $(this).val();
  })
  $('#save-note-btn').on('click', function (e) {
    recognition.stop();
    if (!noteContent.length) {
      instructions.text('Could not save empty note. Please add a message to your note.');
    }
    else {
      saveNote(new Date().toLocaleString(), noteContent);
      noteContent = '';
      renderNotes(getAllNotes());
      noteTextarea.val('');
      instructions.text('Note saved successfully.');
    }
  })
  notesList.on('click', function (e) {
    e.preventDefault();
    var target = $(e.target);
    if (target.hasClass('listen-note')) {
      var content = target.closest('.note').find('.content').text();
      readOutLoud(content);
    }
    if (target.hasClass('delete-note')) {
      var dateTime = target.siblings('.date').text();
      deleteNote(dateTime);
      target.closest('.note').remove();
    }
  });
  function readOutLoud(message: any) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }
  function renderNotes(notes: any) {
    var html = '';
    if (notes.length) {
      notes.forEach(function (note: any) {
        html += `<li class="note">
            <p class="header">
              <span class="date">${note.date}</span>
              <a href="#" style="color:#EA5A41" class="delete-note" title="Delete">Delete</a>
              
            <p class="note-content">${note.content}</p>
          </li>`;
      });
    }
    else {
      html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
    }
    notesList.html(html);
  }
  function saveNote(dateTime: any, content: any) {
    localStorage.setItem('note-' + dateTime, content);
  }
  function getAllNotes() {
    var notes = [];
    var key;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (key?.substring(0, 5) === 'note-') {
        notes.push({
          date: key?.replace('note-', ''),
          content: localStorage.getItem(String(localStorage.key(i)))
        });
      }
    }
    return notes;
  }
  function deleteNote(dateTime: any) {
    localStorage.removeItem('note-' + dateTime);
  }
  const [userComments, setUserComments] = useState([{ "name": "Ahmad", "comment": "Hello this is a test comment", "date": "4/6/2021, 4:17:07 PM" }, { "name": "Cavid", "comment": "Hello this is a test comment and this comment is particularly very long and it goes on and on and on", "date": "1/7/2021, 7:13:56 PM" }, { "name": "Samir", "comment": "Hello this is a test comment", "date": "8/7/2021, 12:47:13 PM" }])
  useEffect(() => {
    setUserComments(userComments)
  }, [userComments])
    return (
        <div>
                  <i className="fas fa-plus-circle" onClick={() => { setNotesDisplay(notesDisplay === "none" ? "inline-block" : "none"); setDisplay(display === 'inline-block' ? 'none' : 'inline-block') }}></i>

        <div className="card-form" style={{ backgroundImage: 'url(https://just.edu.bd/reserach.jpg)', height: "500px", zIndex: 10, overflow: "auto", width: '30%', display: `${notesDisplay}`, justifyContent: "end" }}>
        <div className="voice-controller">
          <h3 className="no-browser-support">Sorry, Your Browser Doesn't Support the Web Speech API. Try Opening This Demo In Google Chrome.</h3>
          <div className="app">
            <h3>Add New Note</h3>
            <div className="input-single">
              <textarea id="note-textarea" placeholder="Create a new note by typing or using voice recognition." data-rows="6"></textarea>
            </div>
            <button id="start-record-btn" style={{ margin: "10px" }} title="Start Recording">Start Recognition</button>
            <button id="pause-record-btn" style={{ margin: "10px" }} title="Pause Recording">Pause Recognition</button>
            <button id="save-note-btn" title="Save Note">Save Note</button>    <p id="recording-instructions">Press the <strong>Start Recognition</strong> button and allow access.</p>
            <h3>My Notes</h3>
            <ul id="notes">
      
              <li>
                <p className="no-notes">You don't have any notes.</p>
              </li>
            </ul>
            <button onClick={() => { setNotesDisplay(notesDisplay === "none" ? "inline-block" : "none") }}> Close </button>
          </div>

        </div>
      </div>
      </div>

    )
}


export default Notes