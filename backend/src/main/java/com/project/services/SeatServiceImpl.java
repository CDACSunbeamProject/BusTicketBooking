package com.project.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.daos.BusDao;
import com.project.daos.RouteDao;
import com.project.daos.SeatAvailabilityDao;
import com.project.dto.BusesRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.entities.Bus;
import com.project.entities.Seat;
import com.project.entities.SeatStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SeatServiceImpl implements SeatService{

	private final SeatAvailabilityDao seatDao;
	private final ModelMapper modelMapper;
	
	@Override
    public List<SeatAvailabilityDTO> getSeatAvailability(int busId) {
        return seatDao.findByBusId(busId)
                .stream()
                .map(seat -> modelMapper.map(seat, SeatAvailabilityDTO.class))
                .toList();
    }

	@Override
    public void generateSeatsForBus(Bus bus, int totalSeats) {
        List<Seat> seats = new ArrayList<>();

        for (int i = 1; i <= totalSeats; i++) {
            String seatNo = "S" + i; // Or "A1", "A2", format as per your design
            Seat seat = new Seat();
            seat.setBus(bus);
            seat.setSeatNumber(seatNo);
            seat.setStatus(SeatStatus.AVAILABLE);
            seats.add(seat);
        }

        seatDao.saveAll(seats);
    }
}
