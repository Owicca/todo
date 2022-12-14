import React from 'react';

function Caption() {
  return <caption>
    <h1>topics:</h1>
    <ul>
      <li>name: a simple string</li>
      <li>depth:
        <ol>
          <li>understand(know about it at a theoretical level)</li>
          <li>dabble(can apply basic concepts with google in a reasonable time)</li>
          <li>apply(can apply medium concepts with less than 50% google)</li>
          <li>teach(confident enough to teach it to somebody else)</li>
        </ol>
      </li>
      <li>time commitment(h / week for n weeks/months):
        <ol>
          <li>low (1h/day => 7h/week)</li>
          <li>medium(2h/day => 14h/week)</li>
          <li>high (3h/day => 21h/week)</li>
        </ol>
      </li>
      <li>difficulty:
        <ol>
          <li>easy(can work while listening to a podcast in the background)</li>
          <li>medium(only music in the background)</li>
          <li>hard(requires full attention)</li>
        </ol>
      </li>
      <li>phase:
        <ol>
          <li>not started</li>
          <li>plan(research learning path)</li>
          <li>in progress</li>
          <li>done(finished learning)</li>
          <li>paused(provide a reason in a tooltip)</li>
        </ol>
      </li>
    </ul>
  </caption>;
};

export default Caption;
