package com.project.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ApiException;
import com.project.daos.BookingDao;
import com.project.daos.UserDao;
import com.project.dto.BookingRespDTO;
import com.project.dto.BusRespDTO;
import com.project.dto.MyBookingRespDTO;
import com.project.dto.UserProfileDTO;
import com.project.dto.UserRequestDTO;
import com.project.dto.UserRespDTO;
import com.project.entities.Booking;
import com.project.entities.Bus;
import com.project.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	// depcy
	private final UserDao userDao;
	private ModelMapper mapper;
	private PasswordEncoder passwordEncoder;
	private ModelMapper modelMapper;
	private BookingDao bookingDao;

	@Override
	public UserRespDTO signUp(UserRequestDTO dto) {
		// 1. check for dup email
		if (userDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Dup Email detected - User exists already!!!!");
		// 2. dto -> entity

		User entity = mapper.map(dto, User.class);
		// 3. encrypt password
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		// 4. save the entity n map persistent entity -> resp dto
		return mapper.map(userDao.save(entity), UserRespDTO.class);
	}

	@Override
	public UserProfileDTO getUserProfileDetails(String email) {
		System.out.println("inside profile update");
		User user = userDao.findByEmail(email)
				.orElseThrow(() -> new ApiException("User Not Found with email:" + email));

		UserProfileDTO userProfile = new UserProfileDTO();
		userProfile.setId(user.getId());
		userProfile.setName(user.getName());
		userProfile.setEmail(user.getEmail());
		userProfile.setAge(user.getAge());
		userProfile.setGender(user.getGender());
		userProfile.setPhone(user.getPhone());
		return userProfile;
	}

	@Override
	public List<MyBookingRespDTO> getMyBookings(String email) {
		User user = userDao.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch bookings for that user
        List<Booking> bookings = bookingDao.findByUser(user);

        // Map Booking entities to DTO
        return bookings.stream().map(booking -> {
        	MyBookingRespDTO dto = new MyBookingRespDTO();

            dto.setBookingId(booking.getId());
            dto.setBookingTime(booking.getCreationDateTime()); // assuming createdOn or bookingTime stored in BaseEntity or Booking
            dto.setBookingStatus(booking.getStatus().name());
            dto.setTotalFare(booking.getTotalFare());

            Bus bus = booking.getBus();
            dto.setBusNo(bus.getBusNo());
            dto.setBusName(bus.getBusName());

            dto.setDepartureDate(bus.getDepartureDate() != null ? bus.getDepartureDate().toString() : null);
            dto.setDepartureTime(bus.getDepartureTime() != null ? bus.getDepartureTime().toString() : null);

            // Ticket info (can be null if not generated yet)
            if (booking.getTicket() != null) {
                dto.setTicketId(booking.getTicket().getId());
                dto.setTicketStatus(booking.getTicket().getStatus().name());
            }
            dto.setSource(booking.getBus().getBusRoute().getStartLocation());
            dto.setDestination(booking.getBus().getBusRoute().getEndLocation());
            dto.setPassengerCount(booking.getPassengers() != null ? booking.getPassengers().size() : 0);

            return dto;
        }).collect(Collectors.toList());
    }
	
	public long getTotalAmount() {
		List<User> users= userDao.findAll();
		long totalAmount = 0;
		for(User u:users) {
			List<Booking> bookings=u.getBookings();
			for(Booking b: bookings) {
				totalAmount += (long) b.getTotalFare();
			}
		}
		return totalAmount;
	}
	
	@Override
	public List<BookingRespDTO> getAllBookings() {
		System.out.println("inside all bookings");
		List<BookingRespDTO> bookings =new ArrayList<>();
		List<User> users=userDao.findAll();
		for(User user:users) {
			
			for(Booking booking : user.getBookings()) {
				BookingRespDTO b = new BookingRespDTO();
				b.setBookingId(booking.getId());
				b.setBookingTime(booking.getCreationDateTime().toString());
				b.setBookingStatus(booking.getStatus());
				b.setTotalAmount(booking.getTotalFare());
				b.setPaymentStatus(booking.getPayment().getStatus());
				b.setUserId(user.getId());
				b.setNoOfSeats(booking.getPassengers().size());
				b.setBusName(booking.getBus().getBusName());
				b.setBusNo(booking.getBus().getBusNo());
				b.setBusId(booking.getBus().getId());
				b.setUserName(booking.getUser().getName());
				bookings.add(b);
			}
		}
		return bookings;
	}
	@Override
	public List<UserRespDTO> getAllUsers() {
		List<User> users = userDao.findAll();
		System.out.println("Users fetched: " + users.size());

		List<UserRespDTO> dtoList = users.stream().map(user -> {
		    System.out.println("Mapping user: " + user);
		    UserRespDTO dto = modelMapper.map(user, UserRespDTO.class);
		    dto.setCreationDate(user.getCreationDateTime() != null ? user.getCreationDateTime().toLocalDate() : null);
		    dto.setNoOfBookings(user.getBookings().size());
		    System.out.println("Mapped DTO: " + dto);
		    return dto;
		}).toList();

		return dtoList;
	}
	@Override
	public UserProfileDTO updateProfile(UserProfileDTO dto) {
		User user=userDao.findByEmail(dto.getEmail()).orElseThrow();
		user.setAge(dto.getAge());
		user.setGender(dto.getGender());
		user.setName(dto.getName());
		user.setPhone(dto.getPhone());
		userDao.save(user);
		return modelMapper.map(user, UserProfileDTO.class);
	}
}
