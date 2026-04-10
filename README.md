# Big Clock

A large digital clock card for Home Assistant Lovelace.

Displays the current time at 90px and the date at 40px — designed for wall-mounted tablets and dashboards where visibility from a distance matters.

## Installation

1. Add this repository as a custom repository in HACS (type: Dashboard)
2. Install "Big Clock"
3. Add the card to your dashboard:

```yaml
type: custom:big-clock
```

## Configuration

| Option     | Type   | Default              | Description              |
|------------|--------|----------------------|--------------------------|
| `timeZone` | string | HA system timezone   | Override timezone         |
| `locale`   | string | HA system language   | Override locale (e.g. `en-US`) |

### Example

```yaml
type: custom:big-clock
timeZone: America/New_York
locale: en-US
```

## Display

- **Time**: 90px, bold — e.g. `3:45 PM`
- **Date**: 40px, bold — e.g. `Wednesday, Apr 9`
