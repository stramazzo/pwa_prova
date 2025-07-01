import tkinter as tk
from tkinter import ttk, messagebox
import math
import configparser

class BoilerCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Boiler Calculator")
        
        # Set minimum window size
        self.root.minsize(500, 500)  # width, height
        
        # Set initial window size
        self.root.geometry("1500x1000")  # width x height

        # Create main container with scrollbar
        container = ttk.Frame(self.root)
        container.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        
        # Configure grid weights for better resizing
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)
        
        # Create canvas and scrollbar
        self.canvas = tk.Canvas(container)
        self.v_scrollbar = ttk.Scrollbar(container, orient="vertical", command=self.canvas.yview)
        self.h_scrollbar = ttk.Scrollbar(container, orient="horizontal", command=self.canvas.xview)
        self.main_frame = ttk.Frame(self.canvas)
        
        # Configure canvas
        self.main_frame.bind(
            "<Configure>",
            lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all"))
        )
        self.canvas.create_window((0, 0), window=self.main_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=self.v_scrollbar.set, xscrollcommand=self.h_scrollbar.set)

        # Pack scrollbar and canvas
        self.v_scrollbar.pack(side="right", fill="y")
        self.h_scrollbar.pack(side="bottom", fill="x")
        self.canvas.pack(side="left", fill="both", expand=True)
        
        # Load default parameters
        self.load_default_parameters()

        # Create the calculator interface
        self.create_gui()

    def load_default_parameters(self):
        
        """Load default parameters from config file"""
        self.default_values = {
            # Heating Time Calculator parameters
            'ht_initial_temp': 50.0,
            'ht_target_temp': 70.0,
            'ht_water_volume': 5.0,
            'ht_heater_power': 2000.0,
            'ht_room_temp': 20.0,
            'ht_heat_transfer_coeff': 15.0,
            'ht_surface_area': 0.5,
            'ht_stainless_steel_volume': 0.001,
            # Power Calculator parameters
            'pc_initial_temp': 50.0,
            'pc_target_temp': 70.0,
            'pc_water_volume': 5.0,
            'pc_stainless_steel_volume': 0.001,
            'pc_time_required': 300.0,
            'pc_room_temp': 20.0,
            'pc_heat_transfer_coeff': 15.0,
            'pc_surface_area': 0.5,
            # Cooling Time Calculator parameters
            "ct_initial_temp": 70.0,
            "ct_final_temp": 50.0,
            "ct_water_volume": 5.0,
            "ct_room_temp": 20.0,
            "ct_heat_transfer_coeff": 15.0,
            "ct_surface_area": 0.5,
            "ct_stainless_steel_volume": 0.001,
            # Brewing Time Calculator parameters
            "br_initial_temp": 95.0,
            "br_water_volume": 5.0,
            "br_stainless_steel_volume": 0.001,
            "br_applied_heater_power": 0,
            "br_brewing_flow_rate": 5.0,
            "br_brewing_time_duration": 20.0,
            "br_plumbing_temperature": 20.0
        }
        
        try:
            config = configparser.ConfigParser()
            config.read('calculator_config.ini')
            
            if 'DefaultParameters' in config:
                for key in self.default_values:
                    try:
                        self.default_values[key] = config.getfloat('DefaultParameters', key)
                    except:
                        print(f"Warning: Could not load default {key} from config file. Using in-code default value.")
        except Exception as e:
            print(f"Warning: Could not load config file: {str(e)}")
             
    def create_gui(self):
        # Create a container for the main calculators and the simple calculator
        main_container = ttk.Frame(self.main_frame)
        main_container.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Right side: Simple Calculator
        simple_calc_frame = ttk.LabelFrame(main_container, text="Simple Calculator", padding="10")
        simple_calc_frame.grid(row=0, column=0, padx=10, pady=5, sticky=(tk.N, tk.W, tk.E, tk.S))

        # Bottom frame for parameter management buttons
        bottom_frame = ttk.LabelFrame(main_container, text="Parameter Management", padding="10")
        bottom_frame.grid(row=0, column=2, padx=10, pady=5, sticky=(tk.N, tk.W, tk.E))

        # Heating Time Calculator Frame
        heating_frame = ttk.LabelFrame(main_container, text="Heating Time Calculator", padding="10")
        heating_frame.grid(row=1, column=0, padx=10, pady=5, sticky=(tk.N, tk.W, tk.E, tk.S))
      
        # Power Calculator Frame
        power_frame = ttk.LabelFrame(main_container, text="Power Calculator", padding="10")
        power_frame.grid(row=1, column=1, padx=10, pady=5, sticky=(tk.N, tk.W, tk.E, tk.S))

         # Cooling Time Calculator Frame
        cooling_frame = ttk.LabelFrame(main_container, text="Cooling Time Calculator", padding="10")
        cooling_frame.grid(row=1, column=2, padx=10, pady=5, sticky=(tk.N, tk.W, tk.E, tk.S))

        # Brewing Loss Calculator Frame
        brewing_loss_frame = ttk.LabelFrame(main_container, text="Brewing Loss Calculator", padding="10")
        brewing_loss_frame.grid(row=1, column=3, padx=10, pady=5, sticky=(tk.N, tk.W, tk.E))


        # Parameter management buttons
        ttk.Button(bottom_frame, text="Reset to Defaults", 
                  command=self.reset_to_default).grid(row=0, column=0, padx=5, pady=5)
        ttk.Button(bottom_frame, text="Save Parameters", 
                  command=self.save_parameters).grid(row=0, column=1, padx=5, pady=5)
        ttk.Button(bottom_frame, text="Load Parameters", 
                  command=self.load_parameters).grid(row=0, column=2, padx=5, pady=5)
        
        # Input fields for Heating Time Calculator
        self.heating_entries = {}
        heating_params = {
            "ht_initial_temp": "Initial Temperature (°C)",
            "ht_target_temp": "Target Temperature (°C)",
            "ht_water_volume": "Water Volume (L)",
            "ht_heater_power": "Heater Power (W)",
            "ht_room_temp": "Room Temperature (°C)",
            "ht_heat_transfer_coeff": "Heat Transfer Coefficient (W/m²·°C)",
            "ht_surface_area": "External Surface Area (m²)",
            "ht_stainless_steel_volume": "Stainless Steel Volume (m³)"
        }
        
        # Input fields for Power Calculator
        self.power_entries = {}
        power_params = {
            "pc_initial_temp": "Initial Temperature (°C)",
            "pc_target_temp": "Target Temperature (°C)",
            "pc_water_volume": "Water Volume (L)",
            "pc_time_required": "Time Required (seconds)",
            "pc_room_temp": "Room Temperature (°C)",
            "pc_heat_transfer_coeff": "Heat Transfer Coefficient (W/m²·°C)",
            "pc_surface_area": "External Surface Area (m²)",
            "pc_stainless_steel_volume": "Stainless Steel Volume (m³)"
        }

        # Input fields for Heating Time Calculator
        self.cooling_entries = {}
        cooling_params = {
            "ct_initial_temp": "Initial Temperature (°C)",
            "ct_final_temp": "Final Temperature (°C)",
            "ct_water_volume": "Water Volume (L)",
            "ct_room_temp": "Room Temperature (°C)",
            "ct_heat_transfer_coeff": "Heat Transfer Coefficient (W/m²·°C)",
            "ct_surface_area": "External Surface Area (m²)",
            "ct_stainless_steel_volume": "Stainless Steel Volume (m³)"
        }


        # Brewing parameters
        self.brewing_entries = {}
        brewing_params = {
            "br_initial_temp": "Initial Temperature (°C)",
            "br_water_volume": "Water Volume (L)",
            "br_stainless_steel_volume": "Stainless Steel Volume (m³)",
            "br_applied_heater_power": "Applied Heater Power (W)",
            "br_brewing_flow_rate": "Brewing flow rate (ml/s)",
            "br_brewing_time_duration": "Brewing time duration (s)",
            "br_plumbing_temperature": "Brewing plumbing temperature (°C)"
        }
        
        
        # Heating Time Calculator fields construction
        row = 0
        for param, label in heating_params.items():
            ttk.Label(heating_frame, text=label).grid(row=row, column=0, sticky=tk.W, padx=5)
            entry = ttk.Entry(heating_frame, width=15)
            entry.insert(0, str(self.default_values[param]))
            entry.grid(row=row, column=1, sticky=tk.W, padx=5)
            self.heating_entries[param] = entry
            row += 1

        # Calculate button
        ttk.Button(heating_frame, text="Calculate Heating Time", 
                  command=self.calculate_heating_time).grid(row=row, column=0, columnspan=2, pady=10)


        # Power Calculator fields construction
        row = 0
        for param, label in power_params.items():
            ttk.Label(power_frame, text=label).grid(row=row, column=0, sticky=tk.W, padx=5)
            entry = ttk.Entry(power_frame, width=15)
            entry.insert(0, str(self.default_values[param]))
            entry.grid(row=row, column=1, sticky=tk.W, padx=5)
            self.power_entries[param] = entry
            row += 1
        
        # Calculate Power button
        ttk.Button(power_frame, text="Calculate Required Power", 
                  command=self.calculate_required_power).grid(row=row, column=0, columnspan=2, pady=10)
        
        # Cooling Time Calculator fields construction
        row = 0
        for param, label in cooling_params.items():
            ttk.Label(cooling_frame, text=label).grid(row=row, column=0, sticky=tk.W, padx=5)
            entry = ttk.Entry(cooling_frame, width=15)
            entry.insert(0, str(self.default_values[param]))
            entry.grid(row=row, column=1, sticky=tk.W, padx=5)
            self.cooling_entries[param] = entry
            row += 1
                
        # Add button to calculate cooling time
        ttk.Button(cooling_frame, text="Calculate Cooling Time", 
                   command=self.calculate_cooling_time).grid(row=row, column=0, columnspan=2, pady=10)
        
        # Brewing Loss Calculator fields construction
        row = 0
        for param, label in brewing_params.items():
            ttk.Label(brewing_loss_frame, text=label).grid(row=row, column=0, sticky=tk.W, padx=5)
            entry = ttk.Entry(brewing_loss_frame, width=10)
            entry.insert(0, str(self.default_values[param]))
            entry.grid(row=row, column=1, sticky=tk.W, padx=5)
            self.brewing_entries[param] = entry
            row += 1

        # Calculate button
        ttk.Button(brewing_loss_frame, text="Calculate Brewing Loss", 
                  command=self.calculate_brewing_loss).grid(row=row, column=0, columnspan=2, pady=10)


        row += 1
         
        # Results frame
        power_results_frame = ttk.Frame(power_frame)
        power_results_frame.grid(row=row+1, column=0, columnspan=2, sticky=(tk.W, tk.E))
        
        # Power Results fields
        self.power_results = {}
        power_results = {
            "total_power": "Total Power Required (W/h):",
            "power_to_water": "Power to Water (W/h):",
            "power_to_steel": "Power to Stainless Steel (W/h):",
            "power_lost": "Power Lost to Environment (W/h):",
            "instant_power": "Required Heater Power (W):"
        }

        result_row = 0
        for key, label in power_results.items():
            ttk.Label(power_results_frame, text=label).grid(row=result_row, column=0, sticky=tk.W, padx=5)
            result_entry = ttk.Entry(power_results_frame, width=15, state='readonly')
            result_entry.grid(row=result_row, column=1, sticky=tk.W, padx=5)
            self.power_results[key] = result_entry
            result_row += 1


        # Cooling Results frame
        cooling_results_frame = ttk.Frame(cooling_frame)
        cooling_results_frame.grid(row=row+1, column=0, columnspan=2, sticky=(tk.W, tk.E))

        # Cooling Results fields
        self.cooling_results = {}
        cooling_results = {
            "cooling_result": "Estimated Cooling Time:",
            "cooling_seconds": "Time in Seconds (s):",
            "cooling_total_power_lost_result": "Total Power Lost (W/h):",
            "cooling_total_power_lost_water_result": "Total Power Lost Water (W/h):",
            "cooling_total_power_lost_steel_result": "Total Power Lost Stainless Steel (W/h):"
        }

        result_row = 0
        for key, label in cooling_results.items():
            ttk.Label(cooling_results_frame, text=label).grid(row=result_row, column=0, sticky=tk.W, padx=5)
            result_entry = ttk.Entry(cooling_results_frame, width=15, state='readonly')
            result_entry.grid(row=result_row, column=1, sticky=tk.W, padx=5)
            self.cooling_results[key] = result_entry
            result_row += 1
        
        # Heating Results frame
        heating_results_frame = ttk.Frame(heating_frame)
        heating_results_frame.grid(row=row+1, column=0, columnspan=2, sticky=(tk.W, tk.E))


        # Heating Results fields
        self.heating_results = {}
        heating_results = {
            "heating_result": "Estimated Heating Time:",
            "heating_seconds": "Time in Seconds (s):"
        }

        result_row = 0
        for key, label in heating_results.items():
            ttk.Label(heating_results_frame, text=label).grid(row=result_row, column=0, sticky=tk.W, padx=5)
            result_entry = ttk.Entry(heating_results_frame, width=15, state='readonly')
            result_entry.grid(row=result_row, column=1, sticky=tk.W, padx=5)
            self.heating_results[key] = result_entry
            result_row += 1


        # Results frame
        brewing_results_frame = ttk.Frame(brewing_loss_frame)
        brewing_results_frame.grid(row=row+1, column=0, columnspan=2, sticky=(tk.W, tk.E))

        # Results fields
        self.brewing_results = {}
        brewing_results = {
            "final_temp": "Boiler Final Temperature (°C):",
            "lost_temp": "Boiler Temperature Loss (°C):",
            "average_brewed_temp": "Average Brewed Temperature(°C):",
            "initial_brewed_temp": "Initial Brewed Temperature(°C):",
            "final_brewed_temp": "Final Brewed Temperature(°C):",
            "total_brewed_volume": "Total Brewed Volume (L):",
            "brewing_energy_loss": "Brewing Energy Loss (W):",
        }

        result_row = 0
        for key, label in brewing_results.items():
            ttk.Label(brewing_results_frame, text=label).grid(row=result_row, column=0, sticky=tk.W, padx=5)
            result_entry = ttk.Entry(brewing_results_frame, width=15, state='readonly')
            result_entry.grid(row=result_row, column=1, sticky=tk.W, padx=5)
            self.brewing_results[key] = result_entry
            result_row += 1


        # Display
        self.calc_display = ttk.Entry(simple_calc_frame, width=20, justify='right')
        self.calc_display.grid(row=0, column=0, columnspan=4, padx=5, pady=5, sticky=(tk.W, tk.E))
        
        # Number pad and operators
        buttons = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', '.', '=', '+'
        ]
        
        row = 1
        col = 0
        self.current_number = ''
        self.first_number = None
        self.operation = None
        self.start_new_number = True
        
        for button in buttons:
            cmd = lambda x=button: self.calculator_button_click(x)
            btn = ttk.Button(simple_calc_frame, text=button, command=cmd, width=3)
            btn.grid(row=row, column=col, padx=2, pady=2)
            col += 1
            if col > 3:
                col = 0
                row += 1
        
        # Clear button
        ttk.Button(simple_calc_frame, text='C', 
                  command=self.calculator_clear, 
                  width=3).grid(row=row, column=0, columnspan=4, padx=2, pady=2)
   
    def calculate_required_power(self):
        try:
            # Get values from entries
            initial_temp = float(self.power_entries["pc_initial_temp"].get())
            target_temp = float(self.power_entries["pc_target_temp"].get())
            water_volume = float(self.power_entries["pc_water_volume"].get())
            time_required = float(self.power_entries["pc_time_required"].get())
            room_temp = float(self.power_entries["pc_room_temp"].get())
            heat_transfer_coeff = float(self.power_entries["pc_heat_transfer_coeff"].get())
            surface_area = float(self.power_entries["pc_surface_area"].get())
            stainless_steel_volume = float(self.power_entries["pc_stainless_steel_volume"].get())
            
            # Constants
            WATER_SPECIFIC_HEAT = 4186  # J/(kg·°C)
            WATER_DENSITY = 1.0  # kg/L
            STAINLESS_STEEL_DENSITY = 8000  # kg/m³ (approximate density of stainless steel)
            STAINLESS_STEEL_SPECIFIC_HEAT = 500  # J/(kg·°C) (approximate specific heat of stainless steel)
            
            # Calculate water mass
            water_mass = water_volume * WATER_DENSITY  # kg
            
            # Calculate stainless steel mass
            stainless_steel_mass = stainless_steel_volume * STAINLESS_STEEL_DENSITY  # kg
            
            # Use numerical approximation to calculate power requirements
            time_step = 0.1  # seconds

            total_energy_to_water = (water_mass * WATER_SPECIFIC_HEAT) * (target_temp - initial_temp)
            total_energy_to_steel = (stainless_steel_mass * STAINLESS_STEEL_SPECIFIC_HEAT) * (target_temp - initial_temp)
            first_estimate_total_energy_lost = time_required * heat_transfer_coeff * surface_area * ((target_temp + initial_temp)/2 - room_temp)
            first_estimate_total_energy = total_energy_to_water + total_energy_to_steel + first_estimate_total_energy_lost
            first_estimate_total_power = first_estimate_total_energy / time_required

            number_of_iterations = 0
            while number_of_iterations < 10:
                current_temp = initial_temp
                total_energy_lost = 0
                simulation_time = 0
                while simulation_time < time_required and current_temp < target_temp :
                    # Calculate heat loss at current temperature
                    heat_loss = heat_transfer_coeff * surface_area * (current_temp - room_temp)
                    total_energy_lost += heat_loss * time_step
                    
                    # Calculate temperature change from net energy
                    delta_temp = (first_estimate_total_power * time_step - heat_loss * time_step) / (water_mass * WATER_SPECIFIC_HEAT + stainless_steel_mass * STAINLESS_STEEL_SPECIFIC_HEAT)
                    current_temp += delta_temp
                    
                    # Update simulation time
                    simulation_time += time_step
                first_estimate_total_power = (total_energy_to_water + total_energy_to_steel + total_energy_lost)/time_required
                number_of_iterations += 1

            # Calculate average powers

            power_to_water = total_energy_to_water / time_required  # Watts
            power_to_steel = total_energy_to_steel / time_required  # Watts
            power_lost = total_energy_lost / time_required  # Watts
            total_power = power_to_water + power_to_steel + power_lost  # Watts
            
            # Convert to W/h for display
            hours = time_required / 3600  # convert seconds to hours
            total_power_per_hour = total_power * hours
            power_to_water_per_hour = power_to_water * hours
            power_to_steel_per_hour = power_to_steel * hours
            power_lost_per_hour = power_lost * hours
            
            # Update result fields
            for key, entry in self.power_results.items():
                entry.configure(state='normal')
                entry.delete(0, tk.END)
                
                if key == "total_power":
                    entry.insert(0, f"{total_power_per_hour:.1f}")
                elif key == "power_to_water":
                    entry.insert(0, f"{power_to_water_per_hour:.1f}")
                elif key == "power_to_steel":
                    entry.insert(0, f"{power_to_steel_per_hour:.1f}")
                elif key == "power_lost":
                    entry.insert(0, f"{power_lost_per_hour:.1f}")
                elif key == "instant_power":
                    entry.insert(0, f"{total_power:.1f}")
                

                entry.configure(state='readonly')
            
        except ValueError as e:
            messagebox.showerror("Error", "Please enter valid numbers for all fields")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

    def reset_to_default(self):
        # Load default parameters
        self.load_default_parameters()

        """Reset all fields to default values"""
        # Reset heating calculator fields
        for param, entry in self.heating_entries.items():
            entry.delete(0, tk.END)
            entry.insert(0, str(self.default_values[param]))
        
        # Reset power calculator fields
        for param, entry in self.power_entries.items():
            entry.delete(0, tk.END)
            entry.insert(0, str(self.default_values[param]))

        # Reset cooling calculator fields
        for param, entry in self.cooling_entries.items():
            entry.delete(0, tk.END)
            entry.insert(0, str(self.default_values[param]))

        # Reset brewing calculator fields
        for param, entry in self.brewing_entries.items():
            entry.delete(0, tk.END)
            entry.insert(0, str(self.default_values.get(param, 0.0)))

        # Clear power results fields
        for param, entry in self.power_results.items():
            entry.configure(state='normal')
            entry.delete(0, tk.END)
            entry.configure(state='readonly')
        
        # Clear cooling results fields
        for param, entry in self.cooling_results.items():
            entry.configure(state='normal')
            entry.delete(0, tk.END)
            entry.configure(state='readonly')

        # Clear heating results fields
        for param, entry in self.heating_results.items():
            entry.configure(state='normal')
            entry.delete(0, tk.END)
            entry.configure(state='readonly')

        # Clear brewing results fields
        for param, entry in self.brewing_results.items():
            entry.configure(state='normal')
            entry.delete(0, tk.END)
            entry.configure(state='readonly')
        
    def calculate_heating_time(self):
        try:
            # Get values from entries
            initial_temp = float(self.heating_entries["ht_initial_temp"].get())
            target_temp = float(self.heating_entries["ht_target_temp"].get())
            water_volume = float(self.heating_entries["ht_water_volume"].get())
            heater_power = float(self.heating_entries["ht_heater_power"].get())
            room_temp = float(self.heating_entries["ht_room_temp"].get())
            heat_transfer_coeff = float(self.heating_entries["ht_heat_transfer_coeff"].get())
            surface_area = float(self.heating_entries["ht_surface_area"].get())
            stainless_steel_volume = float(self.heating_entries["ht_stainless_steel_volume"].get())
            
            # Constants
            WATER_SPECIFIC_HEAT = 4186  # J/(kg·°C)
            WATER_DENSITY = 1.0  # kg/L
            STAINLESS_STEEL_DENSITY = 8000  # kg/m³ (approximate density of stainless steel)
            STAINLESS_STEEL_SPECIFIC_HEAT = 500  # J/(kg·°C) (approximate specific heat of stainless steel)
            
            # Calculate water mass
            water_mass = water_volume * WATER_DENSITY  # kg
            
            # Calculate stainless steel mass
            stainless_steel_mass = stainless_steel_volume * STAINLESS_STEEL_DENSITY  # kg
            
            # Calculate time using numerical approximation
            time_step = 0.1  # seconds
            current_temp = initial_temp
            total_time = 0
            
            while current_temp < target_temp and total_time < 3600:  # limit to 1 hour
                # Calculate heat loss using heat transfer coefficient and surface area
                heat_loss = heat_transfer_coeff * surface_area * (current_temp - room_temp)
                
                # Calculate energy input from heater for this time step
                energy_input = heater_power * time_step  # Joules
                
                # Calculate energy lost to environment in this time step
                energy_lost = heat_loss * time_step  # Joules
                
                # Calculate temperature change from net energy
                delta_temp = (energy_input - energy_lost ) / (water_mass * WATER_SPECIFIC_HEAT + stainless_steel_mass * STAINLESS_STEEL_SPECIFIC_HEAT)
                current_temp += delta_temp
                total_time += time_step
            
            # Format results
            if total_time >= 3600:
                formatted_result = "Over 1 hour"
                seconds_result = "> 3600"
            else:
                minutes = int(total_time // 60)
                seconds = int(total_time % 60)
                formatted_result = f"{minutes}m {seconds}s"
                seconds_result = f"{total_time:.1f}"

            # Update result fields
            for key, entry in self.heating_results.items():
                entry.configure(state='normal')
                entry.delete(0, tk.END)
                
                if key == "heating_result":
                    entry.insert(0, formatted_result)
                elif key == "heating_seconds":
                    entry.insert(0, seconds_result)
                entry.configure(state='readonly')


        except ValueError as e:
            messagebox.showerror("Error", "Please enter valid numbers for all fields")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

    def calculate_cooling_time(self):
        try:
            # Get values from entries
            initial_temp = float(self.cooling_entries["ct_initial_temp"].get())
            final_temp = float(self.cooling_entries["ct_final_temp"].get()) 
            water_volume = float(self.cooling_entries["ct_water_volume"].get())
            room_temp = float(self.cooling_entries["ct_room_temp"].get())
            heat_transfer_coeff = float(self.cooling_entries["ct_heat_transfer_coeff"].get())
            surface_area = float(self.cooling_entries["ct_surface_area"].get())
            stainless_steel_volume = float(self.cooling_entries["ct_stainless_steel_volume"].get())
            
            # Constants
            WATER_SPECIFIC_HEAT = 4186  # J/(kg·°C)
            WATER_DENSITY = 1.0  # kg/L
            STAINLESS_STEEL_DENSITY = 8000  # kg/m³ (approximate density of stainless steel)
            STAINLESS_STEEL_SPECIFIC_HEAT = 500  # J/(kg·°C) (approximate specific heat of stainless steel)
            
            # Calculate water mass
            water_mass = water_volume * WATER_DENSITY  # kg
            
            # Calculate stainless steel mass
            stainless_steel_mass = stainless_steel_volume * STAINLESS_STEEL_DENSITY  # kg
            
            # Calculate time using numerical approximation
            time_step = 0.1  # seconds
            current_temp = initial_temp
            total_time = 0
            total_energy_lost = 0  # Track total energy lost
            total_energy_lost_water = 0  # Track energy lost from water
            total_energy_lost_steel = 0  # Track energy lost from stainless steel
            
            while current_temp > final_temp and total_time < 10800:  # limit to 3 hour
                # Calculate heat loss using heat transfer coefficient and surface area
                heat_loss = heat_transfer_coeff * surface_area * (current_temp - room_temp)
                
                # Calculate energy lost to environment in this time step
                energy_lost = heat_loss * time_step  # Joules
                total_energy_lost += energy_lost  # Accumulate total energy lost
                
                # Calculate temperature change from energy lost
                delta_temp = energy_lost / (water_mass * WATER_SPECIFIC_HEAT + stainless_steel_mass * STAINLESS_STEEL_SPECIFIC_HEAT)
                current_temp -= delta_temp  # Decrease current temperature
                total_time += time_step
            
            # Calculate Total Power Lost (W/H)
            delta_temp = initial_temp-current_temp
            total_power_lost_water = delta_temp *(water_mass * WATER_SPECIFIC_HEAT)/ (3600)
            total_power_lost_steel = delta_temp *(stainless_steel_mass * STAINLESS_STEEL_SPECIFIC_HEAT)/ (3600)
            total_power_lost = total_power_lost_water + total_power_lost_steel

            # Format results
            if total_time >= 10800:
                formatted_result = "Over 3 hours"
                seconds_result = "> 10800"
            else:
                minutes = int(total_time // 60)
                seconds = int(total_time % 60)
                formatted_result = f"{minutes}m {seconds}s"
                seconds_result = f"{total_time:.1f}"
            
            # Update result fields
            for key, entry in self.cooling_results.items():
                entry.configure(state='normal')
                entry.delete(0, tk.END)
                
                if key == "cooling_result":
                    entry.insert(0, formatted_result)
                elif key == "cooling_seconds":
                    entry.insert(0, seconds_result)
                elif key == "cooling_total_power_lost_result":
                    entry.insert(0, f"{total_power_lost:.1f}")
                elif key == "cooling_total_power_lost_water_result":
                    entry.insert(0, f"{total_power_lost_water:.1f}")   
                elif key == "cooling_total_power_lost_steel_result":
                    entry.insert(0, f"{total_power_lost_steel:.1f}")
                entry.configure(state='readonly')
                
        except ValueError as e:
            messagebox.showerror("Error", "Please enter valid numbers for all fields")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

    def calculator_button_click(self, button):
        if button in '0123456789.':
            if self.start_new_number:
                self.calc_display.delete(0, tk.END)
                self.start_new_number = False
            self.calc_display.insert(tk.END, button)
        elif button in '+-*/':
            try:
                self.first_number = float(self.calc_display.get())
                self.operation = button
                self.start_new_number = True
            except ValueError:
                messagebox.showerror("Error", "Invalid number")
        elif button == '=':
            try:
                second_number = float(self.calc_display.get())
                if self.operation == '+':
                    result = self.first_number + second_number
                elif self.operation == '-':
                    result = self.first_number - second_number
                elif self.operation == '*':
                    result = self.first_number * second_number
                elif self.operation == '/':
                    if second_number == 0:
                        messagebox.showerror("Error", "Cannot divide by zero")
                        return
                    result = self.first_number / second_number
                else:
                    return
                
                self.calc_display.delete(0, tk.END)
                self.calc_display.insert(0, f"{result:.2f}")
                self.start_new_number = True
                self.first_number = None
                self.operation = None
            except ValueError:
                messagebox.showerror("Error", "Invalid calculation")
            except Exception as e:
                messagebox.showerror("Error", str(e))

    def calculator_clear(self):
        self.calc_display.delete(0, tk.END)
        self.first_number = None
        self.operation = None
        self.start_new_number = True

    def save_parameters(self):
        try:
            # Read existing config or create new one
            config = configparser.ConfigParser()
            config.read('calculator_config.ini')
            
            # Ensure DefaultParameters section exists
            if 'DefaultParameters' not in config:
                config['DefaultParameters'] = {}
                for param, value in self.default_values.items():
                    config['DefaultParameters'][param] = str(value)
            
            # Create or update SavedParameters section
            config['SavedParameters'] = {}
            
            # Get current values from both calculators
            all_entries = {**self.heating_entries, **self.power_entries, **self.cooling_entries, **self.brewing_entries}
            for param, entry in all_entries.items():
                try:
                    # Only save if it's a valid float
                    value = float(entry.get())
                    config['SavedParameters'][param] = str(value)
                except ValueError:
                    continue
            
            # Write to file
            with open('calculator_config.ini', 'w') as configfile:
                config.write(configfile)
            
            messagebox.showinfo("Success", "Parameters saved successfully")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save parameters: {str(e)}")

    def load_parameters(self):
        try:
            config = configparser.ConfigParser()
            config.read('calculator_config.ini')
            
            if 'SavedParameters' in config:
                # Update all calculator entries
                all_entries = {**self.heating_entries, **self.power_entries, **self.brewing_entries, **self.cooling_entries}
                for param, entry in all_entries.items():
                    try:
                        value = config.getfloat('SavedParameters', param)
                        entry.delete(0, tk.END)
                        entry.insert(0, str(value))
                    except:
                        continue
                
                messagebox.showinfo("Success", "Parameters loaded successfully")
            else:
                messagebox.showwarning("Warning", "No saved parameters found in config file")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load parameters: {str(e)}")

    def calculate_brewing_loss(self):
        """Calculate brewing loss and update results"""
        try:
            initial_temp = float(self.brewing_entries["br_initial_temp"].get())
            water_volume = float(self.brewing_entries["br_water_volume"].get())
            steel_volume = float(self.brewing_entries["br_stainless_steel_volume"].get())
            applied_heater_power = float(self.brewing_entries["br_applied_heater_power"].get())
            flow_rate = float(self.brewing_entries["br_brewing_flow_rate"].get())
            duration = float(self.brewing_entries["br_brewing_time_duration"].get())
            plumbing_temp = float(self.brewing_entries["br_plumbing_temperature"].get())

            # Constants
            WATER_SPECIFIC_HEAT = 4186  # J/(kg·°C)
            STEEL_SPECIFIC_HEAT = 500   # J/(kg·°C)
            WATER_DENSITY = 1.0         # kg/L
            STEEL_DENSITY = 8000.0      # kg/m³

            # Calculate masses
            water_mass = water_volume * WATER_DENSITY
            steel_mass = steel_volume * STEEL_DENSITY
            total_thermal_mass = (water_mass * WATER_SPECIFIC_HEAT + 
                                steel_mass * STEEL_SPECIFIC_HEAT)

            # Calculate water replacement rate (kg/s)
            water_flow_mass = flow_rate * WATER_DENSITY / 1000.0  # (mL/s *Kg/L) / 1000 to get kg/s

            # Calculate time using numerical approximation
            time_step = 0.01  # seconds
            current_temp = initial_temp
            total_time = 0  # Track total energy lost
            brewing_heat_loss = 0
            total_brewing_energy_loss = 0
            average_brewed_temp = 0
            numberofsteps = int(duration / time_step)
            while total_time < duration:  
                
                brewing_heat_loss = (water_flow_mass * WATER_SPECIFIC_HEAT * (current_temp - plumbing_temp))
                brewing_energy_loss_step = brewing_heat_loss * time_step
                total_brewing_energy_loss += brewing_energy_loss_step

                applied_heater_energy_step = applied_heater_power * time_step
                
                delta_energy_step = applied_heater_energy_step - brewing_energy_loss_step
                # Calculate temperature change from energy lost and applied heater power    
                delta_temp_step = (delta_energy_step) / (total_thermal_mass)
                current_temp += delta_temp_step  # update current temperature
                if (total_time == 0):
                    initial_brewed_temp = current_temp
                total_time += time_step
                average_brewed_temp += current_temp/numberofsteps
            brewing_energy_loss = (total_brewing_energy_loss / duration ) 

            final_temp = current_temp
            lost_temp = initial_temp - final_temp
            final_brewed_temp = final_temp

            total_brewed_volume = (flow_rate * duration) / 1000.0  # Convert mL to L

            # Update results
            for key, entry in self.brewing_results.items():
                entry.configure(state='normal')
                entry.delete(0, tk.END)
                
                if key == "final_temp":
                    entry.insert(0, f"{final_temp:.1f}")
                elif key == "lost_temp":
                    entry.insert(0, f"{lost_temp:.1f}")
                elif key == "average_brewed_temp":
                    entry.insert(0, f"{average_brewed_temp:.1f}")
                elif key == "initial_brewed_temp":
                    entry.insert(0, f"{initial_brewed_temp:.1f}")
                elif key == "final_brewed_temp":
                    entry.insert(0, f"{final_brewed_temp:.1f}")
                elif key == "total_brewed_volume":
                    entry.insert(0, f"{total_brewed_volume:.1f}")
                elif key == "brewing_energy_loss":
                    entry.insert(0, f"{brewing_energy_loss:.1f}")


        except ValueError as e:
            messagebox.showerror("Error", "Please enter valid numeric values for all parameters")


if __name__ == "__main__":
    root = tk.Tk()
    app = BoilerCalculator(root)
    root.mainloop() 