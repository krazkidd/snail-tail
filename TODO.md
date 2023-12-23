# TODO.md

- use native share to share friend codes or something and watch friends' progress on home screen with yours

 ---

DESCRIPTION:

app that encourages exercise by making you run away from a persistent snail that chases you
-- you can "travel" around the globe or just have a countdown of the "distance" between you and the snail
-- you can select the animal (or zombies!) that chases you (different speeds)
   -- track average speed/steps so an appropriate challenge can be picked
-- show how many people the animal has "eaten" today
-- challenge mode where you need to walk some nth percentile and people at the bottom automatically lose
-- add safeguards so people can participate without feeling forced, potentially injuring themselves, i.e.
   -- allow a conditioning/"ramping up" period
   -- allow "checking out"/vacation mode without losing progress
-- allowing joining groups and opting out of global participation; allow individual/family mode

- add home page

- use ion grid or list (with inset) on preferences page?

- enable hash location strat for GH deployments
  - add note to README

- add firestore
  https://capawesome.io/plugins/firebase/cloud-firestore/

- review plugins and projects
  https://capacitorjs.com/docs/apis
  https://github.com/capawesome-team/awesome-capacitorjs

- format number of steps (no fractional part--like time)
  - use the sneaker we are already using on the Move page?
- use a variable step time based on distance?
- scale the timer (use "hours", "days", etc. when appropriate)
- add timer/status in top bar
- add toast notification for timer status change

- enable stricter type checking

1. Refreshing page while active shows the initial state instead of a more recent state (not a bug but is a usability issue).
   - need to call setSteps() *after* calculating new steps
   - should separate step logic out into own method so it
     can be called anywhere

- use validation on config form
  * SEE UDEMY CLASS FOR FORM SUPPORT
  - no empty strings
  - valid gait length
  - avatars must be selected
  - move config validation in PreferencesPage to ConfigService

- stats page
  - # of times caught, streak, avg. # of steps per period
  - have some max step differential and count it as a win

- add compare function for avatar lists to order them
  see https://angular.io/api/common/KeyValuePipe
  or use a map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

- allow changing stride length and initial lead when timer is started
  - we had to disable these because we are tracking steps and not distance

- animate the chase/catch

- rename tail to chaser ("user" and "chaser")?

- fix HACK in step-counter.service.ts
  - use 'init' or null for startup?
