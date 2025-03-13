from persistence.entities.event_entity import Event

class EventMapper:
    @staticmethod
    def entity_to_dto(event: Event) -> dict:
        return {
            "id": event.id,
            "user_id": event.user_id,
            "title": event.title,
            "description": event.description,
            "category": event.category,
            "start_time": event.start_time,
            "end_time": event.end_time,
            "location": event.location,
            "reminder_time": event.reminder_time,
            "created_at": event.created_at,
        }

    @staticmethod
    def dto_to_entity(dto: dict) -> Event:
        return Event(
            id=dto.get("id"),
            user_id=dto.get("user_id"),
            title=dto.get("title"),
            description=dto.get("description"),
            category=dto.get("category"),
            start_time=dto.get("start_time"),
            end_time=dto.get("end_time"),
            location=dto.get("location"),
            reminder_time=dto.get("reminder_time"),
            created_at=dto.get("created_at"),
        )
