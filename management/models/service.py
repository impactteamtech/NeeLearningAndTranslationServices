from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String
from database.database import engine
from enums.enums import LanguageCode
from sqlalchemy import ForeignKey

#setting up the models
class Base(DeclarativeBase):
    pass

#creating the service table
class Service(Base):
    __tablename__ = "services" #the name of our table
    #define our columns
    id: Mapped[int] = mapped_column(primary_key=True)
    teacher_id: Mapped[int] = mapped_column(ForeignKey("user.id"), unique=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    description: Mapped[str] = mapped_column(String(250))
    category: Mapped[str] = mapped_column(String(50))
    language: Mapped[LanguageCode] = mapped_column(String(50))
    price: Mapped[float] = mapped_column()
    duration_minutes: Mapped[int] = mapped_column()
    is_active: Mapped[bool] = mapped_column()
    
#create the table 
Base.metadata.create_all(bind=engine)
